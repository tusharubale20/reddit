package com.practice.reddit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentsDto {
	
    private Long id;
    
    private Long postId;
    
    private String duration;
    
    private String text;
    
    private String userName;
}
