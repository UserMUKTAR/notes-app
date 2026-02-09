package com.Muktar.Notes.App.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

	
	@PostMapping("/summarize")
    public String summarize(@RequestBody String content) {
        return "Summary: " + content.substring(0, Math.min(content.length(), 20)) + "...";
    }

    @PostMapping("/improve")
    public String improve(@RequestBody String content) {
        return "Improved text: " + content.replace("u", "you");
}
}
