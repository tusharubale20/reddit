package com.practice.reddit.service;

import static java.util.stream.Collectors.toList;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.practice.reddit.dto.PostRequest;
import com.practice.reddit.dto.PostResponse;
import com.practice.reddit.exceptions.PostNotFoundException;
import com.practice.reddit.exceptions.SubredditNotFoundException;
import com.practice.reddit.mapper.PostMapper;
import com.practice.reddit.model.Post;
import com.practice.reddit.model.Subreddit;
import com.practice.reddit.model.User;
import com.practice.reddit.repository.PostRepository;
import com.practice.reddit.repository.SubredditRepository;
import com.practice.reddit.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class PostService {

	private final PostRepository postRepository;

	private final SubredditRepository subredditRepository;
	
    private final UserRepository userRepository;
	
	private final AuthService authService;
	
	private final PostMapper postMapper;

	public void save(PostRequest postRequest) {
		Subreddit subreddit = subredditRepository.findByName(postRequest.getSubredditName())
			.orElseThrow(() -> new SubredditNotFoundException(HttpStatus.NOT_FOUND,"No subreddit with name "+postRequest.getSubredditName()+" found."));
		
		User user = authService.getCurrentUser();
		
		Post post = postMapper.map(postRequest, subreddit, user);
		postRepository.save(post);	
	}
	

    @Transactional(readOnly = true)
    public PostResponse getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(HttpStatus.NOT_FOUND,"Corresponding post does not exist."));
       
        PostResponse postResponse = postMapper.mapToDto(post);
        return postResponse;
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts() {
        return postRepository.findAllByOrderByVoteCountDesc()
                .stream()
                .map(postMapper::mapToDto)
                .collect(toList());
    }
    

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsBySubreddit(Long subredditId) {
        Subreddit subreddit = subredditRepository.findById(subredditId)
                .orElseThrow(() -> new SubredditNotFoundException(HttpStatus.NOT_FOUND,"Corresponding subreddit "
                		+ subredditId.toString() +" does not exist."));
        List<Post> posts = postRepository.findAllBySubreddit(subreddit);
        return posts.stream().map(postMapper::mapToDto).collect(toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return postRepository.findByUser(user)
                .stream()
                .map(postMapper::mapToDto)
                .collect(toList());
    }
}
