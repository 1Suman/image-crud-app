from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Image
from .serializers import ImageSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def image_list(request):
    images = Image.objects.filter(is_deleted=False)
    serializer = ImageSerializer(images, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def image_create(request):
    serializer = ImageSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(uploaded_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def image_detail(request, pk):
    try:
        image = Image.objects.get(pk=pk, is_deleted=False)
    except Image.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = ImageSerializer(image, context={'request': request})
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def image_update(request, pk):
    try:
        image = Image.objects.get(pk=pk, is_deleted=False)
    except Image.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    if image.uploaded_by != request.user:
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    partial = request.method == 'PATCH'
    serializer = ImageSerializer(image, data=request.data,
                                  partial=partial, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def image_delete(request, pk):
    try:
        image = Image.objects.get(pk=pk, is_deleted=False)
    except Image.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    if image.uploaded_by != request.user:
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

    # Soft delete — honours your is_deleted field
    image.is_deleted = True
    image.save()
    return Response({'message': 'Deleted'}, status=status.HTTP_204_NO_CONTENT)