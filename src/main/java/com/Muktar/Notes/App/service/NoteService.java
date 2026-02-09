package com.Muktar.Notes.App.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.Muktar.Notes.App.entity.Note;
import com.Muktar.Notes.App.repository.NoteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoteService {

	 private final  NoteRepository repository ;

	    public Note addNote(Note note) {
	        return repository.save(note);
	    }

	    public List<Note> getAll() {
	        return repository.findAll();
	    }

	    public void delete(Long id) {
	        repository.deleteById(id);
	    }
	    public Note update(Long id, Note updated) {
	        return repository.findById(id)
	        		.map(existing -> 
	        		{  
	        		existing.setTitle(updated.getTitle());
	    	        existing.setContent(updated.getContent());
	    	        existing.setUpdatedAt(LocalDateTime.now());
	    	        return repository.save(existing);
	    	        })	        
	        		.orElseThrow(() -> new RuntimeException("Note not found"));
	    }
	    
	    public List<Note> search(String keyword) {
	        return repository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(keyword, keyword);
	    }
	    
	    public Page<Note> getPage(int page, int size) {
	        return repository.findAll(PageRequest.of(page, size, Sort.by("createdAt").descending()));
	    }

	    
}
