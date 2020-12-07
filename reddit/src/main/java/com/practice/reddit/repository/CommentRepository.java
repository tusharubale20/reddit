package com.practice.reddit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practice.reddit.model.Comment;
import com.practice.reddit.model.Post;
import com.practice.reddit.model.User;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findByPost(Post post);

    List<Comment> findAllByUser(User user);
}
