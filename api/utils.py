from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

def getNoteList(request):
    notes = Note.objects.all().order_by('-updated') # ordered based on updated field of model
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
        )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)

def getNoteDetail(request, pk):
    notes = Note.objects.get(id=pk) # changed from all to get
    serializer = NoteSerializer(notes, many=False) # many True to False
    return Response(serializer.data)

def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')