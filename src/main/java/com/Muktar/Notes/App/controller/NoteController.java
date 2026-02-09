package com.Muktar.Notes.App.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Muktar.Notes.App.entity.Note;
import com.Muktar.Notes.App.service.NoteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NoteController {

	 
	  private final NoteService service;

	    @PostMapping
	    public Note create(@RequestBody Note note) {
	        return service.addNote(note);
	    }

	    @GetMapping
	    public List<Note> getAll() {
	        return service.getAll();
	    }

	    @DeleteMapping("/{id}")
	    public void delete(@PathVariable Long id) {
	        service.delete(id);
	    }
	    
	    @PutMapping("/{id}")
	    public Note update(@PathVariable Long id, @RequestBody Note updatedNote) {
	        return service.update(id, updatedNote);
	    }
	    
	    @GetMapping("/search")
	    public List<Note> search(@RequestParam String q) {
	        return service.search(q);
	    }
	    
	    @GetMapping("/page")
	    public Page<Note> getPage(@RequestParam int page, @RequestParam int size) {
	        return service.getPage(page, size);
	    }

	    
	    
}
