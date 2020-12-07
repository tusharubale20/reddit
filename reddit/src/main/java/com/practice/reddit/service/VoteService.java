package com.practice.reddit.service;

import static com.practice.reddit.model.VoteType.UPVOTE;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.practice.reddit.dto.VoteDto;
import com.practice.reddit.exceptions.PostNotFoundException;
import com.practice.reddit.exceptions.RedditException;
import com.practice.reddit.model.Post;
import com.practice.reddit.model.Vote;
import com.practice.reddit.repository.PostRepository;
import com.practice.reddit.repository.VoteRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VoteService {

	private final VoteRepository voteRepository;

	private final PostRepository postRepository;

	private final AuthService authService;

	public void vote(VoteDto voteDto) throws RedditException {
		Post post = postRepository.findById(voteDto.getPostId())
				.orElseThrow(() -> new PostNotFoundException(HttpStatus.NOT_FOUND, "No such post found"));
		Optional<Vote> voteByPostAndUser = voteRepository.findTopByPostAndUserOrderByVoteIdDesc(post,
				authService.getCurrentUser());
		
		int changeVoteCount = 1; 
		
		if (voteByPostAndUser.isPresent() ) {
			if(voteByPostAndUser.get().getVoteType().equals(voteDto.getVoteType())) {
				throw new RedditException(HttpStatus.BAD_REQUEST, "You have already " + voteDto.getVoteType().toString().toLowerCase() + "d this post.");
			} else {
				
				//as user has already voted for this post so to negate it and change it to opposite vote
				// instead of 1 vote(in other user's case), we need to change by 2 vote
				changeVoteCount++;
			}
		}

		if (UPVOTE.equals(voteDto.getVoteType())) {
			post.setVoteCount(post.getVoteCount() + changeVoteCount);
		} else {
			post.setVoteCount(post.getVoteCount() - changeVoteCount);
		}
		
		voteRepository.save(mapToVote(voteDto, post));
		postRepository.save(post);
	}

	private Vote mapToVote(VoteDto voteDto, Post post) {
		return Vote.builder()
				.voteType(voteDto.getVoteType())
				.post(post)
				.user(authService.getCurrentUser())
				.build();
	}

}
