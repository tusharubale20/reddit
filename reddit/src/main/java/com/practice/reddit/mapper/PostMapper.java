package com.practice.reddit.mapper;

import static com.practice.reddit.model.VoteType.DOWNVOTE;
import static com.practice.reddit.model.VoteType.UPVOTE;

import java.time.Instant;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.github.marlonlom.utilities.timeago.TimeAgo;
import com.practice.reddit.dto.PostRequest;
import com.practice.reddit.dto.PostResponse;
import com.practice.reddit.model.Post;
import com.practice.reddit.model.Post.PostBuilder;
import com.practice.reddit.model.Subreddit;
import com.practice.reddit.model.User;
import com.practice.reddit.model.Vote;
import com.practice.reddit.model.VoteType;
import com.practice.reddit.repository.CommentRepository;
import com.practice.reddit.repository.VoteRepository;
import com.practice.reddit.service.AuthService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PostMapper {

	private static final Integer INITIAL_VOTE_COUNT = 0;

	private final CommentRepository commentRepository;
	
	private VoteRepository voteRepository;
   
    private AuthService authService;

	public Post map(PostRequest postRequest, Subreddit subreddit, User user) {
		if (postRequest == null && subreddit == null && user == null) {
			return null;
		}

		PostBuilder post = Post.builder();
		if (postRequest != null) {
			post.postId(postRequest.getPostId());
			post.postName(postRequest.getPostName());
			post.url(postRequest.getUrl());
			post.description(postRequest.getDescription());
		}
		
		if(user != null) {
			post.user(user);
		}
		
		if(subreddit != null) {
			post.subreddit(subreddit);
		}
		
		post.voteCount(INITIAL_VOTE_COUNT);
		post.createdDate(Instant.now());
		return post.build();
	}

	public PostResponse mapToDto(Post post) {
		if (post == null) {
			return null;
		}
		PostResponse postResponse = new PostResponse();

		postResponse.setId(post.getPostId());
		postResponse.setUsername(post.getUser().getUsername());
		postResponse.setSubredditName(post.getSubreddit().getName());
		postResponse.setPostName(post.getPostName());
		postResponse.setUrl(post.getUrl());
		postResponse.setDescription(post.getDescription());
		postResponse.setCommentCount(commentRepository.findByPost(post).size());
		postResponse.setDuration(TimeAgo.using(post.getCreatedDate().toEpochMilli()));
		postResponse.setUpVote(isPostUpVoted(post));
		postResponse.setDownVote(isPostDownVoted(post));
		postResponse.setVoteCount(post.getVoteCount());
		return postResponse;
	}
	
    boolean isPostUpVoted(Post post) {
        return checkVoteType(post, UPVOTE);
    }

    boolean isPostDownVoted(Post post) {
        return checkVoteType(post, DOWNVOTE);
    }

    private boolean checkVoteType(Post post, VoteType voteType) {
        if (authService.isLoggedIn()) {
            Optional<Vote> voteForPostByUser =
                    voteRepository.findTopByPostAndUserOrderByVoteIdDesc(post,
                            authService.getCurrentUser());
            return voteForPostByUser.filter(vote -> vote.getVoteType().equals(voteType))
                    .isPresent();
        }
        return false;
    }
}
