package com.practice.reddit.service;

import static java.util.stream.Collectors.toList;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.practice.reddit.dto.CommentsDto;
import com.practice.reddit.exceptions.PostNotFoundException;
import com.practice.reddit.exceptions.RedditException;
import com.practice.reddit.mapper.CommentMapper;
import com.practice.reddit.model.Comment;
import com.practice.reddit.model.NotificationEmail;
import com.practice.reddit.model.Post;
import com.practice.reddit.model.User;
import com.practice.reddit.repository.CommentRepository;
import com.practice.reddit.repository.PostRepository;
import com.practice.reddit.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CommentService {

	private static final String POST_URL = "";
	
    private final PostRepository postRepository;
    
    private final UserRepository userRepository;
    
    private final AuthService authService;
    
    private final CommentMapper commentMapper;
    
    private final CommentRepository commentRepository;
    
    private final MailContentBuilder mailContentBuilder;
    
    private final MailService mailService;
	
	public void save(CommentsDto commentsDto) {
		Post post = postRepository.findById(commentsDto.getPostId())
			.orElseThrow(() -> new PostNotFoundException(commentsDto.getPostId().toString()));
		
		if(commentsDto.getText().length()<2) {
			throw new RedditException("Comment should not be empty");
		}
		
		User user = authService.getCurrentUser();
		Comment comment = commentMapper.map(commentsDto, post, user );
		commentRepository.save(comment);
		
        String message = mailContentBuilder.build(comment.getUser().getUsername() + " posted a comment on your post." + POST_URL);
        sendCommentNotification(message, post.getUser().getEmail(), comment.getUser().getUsername());
    }

    private void sendCommentNotification(String message, String postUserEmail, String commentedUser) {
        mailService.sendMail(new NotificationEmail(commentedUser + " Commented on your post", postUserEmail, message));
    }

    public List<CommentsDto> getAllCommentsForPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(HttpStatus.NOT_FOUND, "No such post exists."));
        return commentRepository.findByPost(post)
                .stream()
                .map(commentMapper::mapToDto).collect(toList());
    }

    public List<CommentsDto> getAllCommentsForUser(String userName) {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException(userName));
        return commentRepository.findAllByUser(user)
                .stream()
                .map(commentMapper::mapToDto)
                .collect(toList());
    }
}
