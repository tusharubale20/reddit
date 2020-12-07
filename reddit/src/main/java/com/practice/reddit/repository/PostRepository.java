package com.practice.reddit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practice.reddit.model.Post;
import com.practice.reddit.model.Subreddit;
import com.practice.reddit.model.User;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
	
    List<Post> findAllByOrderByVoteCountDesc();
	
	List<Post> findAllBySubreddit(Subreddit subreddit);

    List<Post> findByUser(User user);
}
