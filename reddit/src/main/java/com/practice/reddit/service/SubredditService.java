package com.practice.reddit.service;

import static java.util.stream.Collectors.toList;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.practice.reddit.dto.SubredditDto;
import com.practice.reddit.exceptions.RedditException;
import com.practice.reddit.mapper.SubredditMapper;
import com.practice.reddit.model.Subreddit;
import com.practice.reddit.repository.SubredditRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
 public class SubredditService {
	
	private final SubredditRepository subredditRepository;
	
	private final SubredditMapper subredditMapper;
	
    private final AuthService authService;
	
	@Transactional
	public SubredditDto save(SubredditDto subredditDto) {
		Subreddit save = subredditRepository.save(subredditMapper.mapDtoToSubreddit(subredditDto, authService.getCurrentUser()));
		subredditDto.setId(save.getId());
		return subredditDto;
	}

	@Transactional(readOnly = true)
	public List<SubredditDto> getAll() {
		return subredditRepository.findAll()
			.stream()
			.map(subredditMapper::mapSubredditToDto)
			.collect(toList());
	}

	public SubredditDto getSubreddit(Long id) {
		Subreddit subreddit = subredditRepository.findById(id)
				.orElseThrow(() -> new RedditException(HttpStatus.NOT_FOUND, "No such subreddit exists"));
		return subredditMapper.mapSubredditToDto(subreddit);
	}
	
}
