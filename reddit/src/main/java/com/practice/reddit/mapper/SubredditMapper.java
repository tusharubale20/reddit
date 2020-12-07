package com.practice.reddit.mapper;

import java.time.Instant;

import org.springframework.stereotype.Component;

import com.practice.reddit.dto.SubredditDto;
import com.practice.reddit.model.Subreddit;
import com.practice.reddit.model.Subreddit.SubredditBuilder;
import com.practice.reddit.model.User;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class SubredditMapper {
	
	public SubredditDto mapSubredditToDto(Subreddit subreddit) {
		if (subreddit == null) {
			return null;
		}
		
		SubredditDto subredditDto = new SubredditDto();
		subredditDto.setId(subreddit.getId());
		subredditDto.setName(subreddit.getName());
		subredditDto.setDescription(subreddit.getDescription());
		subredditDto.setNumberOfPosts(subreddit.getPosts().size());
		
		return subredditDto;
	}


    public Subreddit mapDtoToSubreddit(SubredditDto subredditDto, User currentUser) {
    	if(subredditDto == null) {
    		return null;
    	}
    	
    	SubredditBuilder subredditBuilder = Subreddit.builder();
    	subredditBuilder.id(subredditDto.getId());
    	subredditBuilder.name(subredditDto.getName());
    	subredditBuilder.description(subredditDto.getDescription());
    	subredditBuilder.createdDate(Instant.now());
    	subredditBuilder.user(currentUser);
    	
    	return subredditBuilder.build();
    }
}
