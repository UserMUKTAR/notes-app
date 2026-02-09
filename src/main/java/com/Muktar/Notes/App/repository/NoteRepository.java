package com.Muktar.Notes.App.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Muktar.Notes.App.entity.Note;


@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
	List<Note> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String t, String c);

}
