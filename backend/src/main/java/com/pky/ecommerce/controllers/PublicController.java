package com.pky.ecommerce.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pky.ecommerce.config.AuthContext;
import com.pky.ecommerce.config.JwtUtil;
import com.pky.ecommerce.models.AuthRequest;
import com.pky.ecommerce.models.Category;
import com.pky.ecommerce.models.CategoryDTO;
import com.pky.ecommerce.models.LoginUser;
import com.pky.ecommerce.models.Product;
import com.pky.ecommerce.models.User;
import com.pky.ecommerce.repo.CategoryRepo;
import com.pky.ecommerce.repo.ProductRepo;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*")
public class PublicController {

	// private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtTokenUtil;

	@Autowired
	private ProductRepo repo;

	@Autowired
	private CategoryRepo categoryRepo;

	@Autowired
	private AuthContext authContext;

	public PublicController( JwtUtil jwtTokenUtil) {
		// this.authenticationManager = authenticationManager;
		this.jwtTokenUtil = jwtTokenUtil;
	}

	@GetMapping("/product/search")
	public List<Product> getProducts(@RequestParam(name="keyword", required = true) String keyword) {
		return repo.findByProductNameContainingIgnoreCaseOrCategoryCategoryNameContainingIgnoreCase(keyword, keyword);
	}

	@GetMapping("/categories")
	public List<CategoryDTO> getCategories() {
		return categoryRepo.findAll().stream().map(cat -> new CategoryDTO(cat)).toList();
	}

	@PostMapping("/login")
	// {"username": "bob","password": "pass_word"}
	public ResponseEntity<LoginUser> login(@RequestBody AuthRequest request) {
		try {
			Optional<User> user = authContext.doUsernamePasswordAuthentication(request.getUsername(), request.getPassword());
			if(user.isPresent()) {
				String token = jwtTokenUtil.generateToken(user.get().getUsername());
				return ResponseEntity.ok()
                	.body(new LoginUser(token, user.get()));
			}
			return ResponseEntity.status(401).build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(401).build();
		}
	}

}