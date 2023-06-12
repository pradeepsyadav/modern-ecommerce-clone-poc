package com.pky.ecommerce.controllers;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pky.ecommerce.config.AuthContext;
import com.pky.ecommerce.models.Category;
import com.pky.ecommerce.models.Product;
import com.pky.ecommerce.repo.CategoryRepo;
import com.pky.ecommerce.repo.ProductRepo;
import com.pky.ecommerce.repo.UserRepo;

@RestController
@RequestMapping("/api/auth/seller")
@CrossOrigin(origins = "*")
public class SellerController {

	@Autowired
	private ProductRepo repo;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private CategoryRepo categoryRepo;

	@Autowired
	private AuthContext authContext;

	@PostMapping("/product")
	public ResponseEntity<Object> postProduct(@RequestBody Product newProduct, Principal principal) {

		newProduct.setSeller(userRepo.findByUsername(principal.getName()).get());
		Optional<Category> cat = categoryRepo.findByCategoryName(newProduct.getCategory().getCategoryName());
		if (cat.isPresent()) {
			newProduct.setCategory(cat.get());
		} else {
			categoryRepo.save(newProduct.getCategory());
		}

		Product p = repo.save(newProduct);

		return ResponseEntity
				.created(URI.create(String.format("http://localhost/api/auth/seller/product/%d", p.getProductId())))
				.build();
	}

	@GetMapping("/product")
	// @Autowired
	public ResponseEntity<Object> getAllProducts() {
		// List<Product> prods = repo.findBySellerUserId(userRepo.findByUsername(principal.getName()).get().getUserId());
		List<Product> prods = repo.findBySellerUserId(authContext.getPrincipal().getUserId());

		if(prods != null && prods.size() > 0) {
			return ResponseEntity.ok(prods);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/product/{productId}")
	public ResponseEntity<Object> getProduct(@PathVariable Integer productId, Principal principal) {
		Optional<Product> prod = repo.findBySellerUserIdAndProductId( userRepo.findByUsername(principal.getName()).get().getUserId(), productId);
		if(prod.isPresent()) {
			return ResponseEntity.ok(prod.get());
		} else {
			return ResponseEntity.notFound().build();
		}
		
	}

	@PutMapping("/product")
	public ResponseEntity<Object> putProduct(@RequestBody Product updatedProduct, Principal principal) {

		Optional<Product> existingProduct = repo.findBySellerUserIdAndProductId( userRepo.findByUsername(principal.getName()).get().getUserId(), updatedProduct.getProductId());

		if (existingProduct.isPresent()) {
			updatedProduct.setSeller(userRepo.findByUsername(principal.getName()).get());
			Optional<Category> cat = categoryRepo.findByCategoryName(updatedProduct.getCategory().getCategoryName());
			if (cat.isPresent()) {
				updatedProduct.setCategory(cat.get());
			} else {
				categoryRepo.save(updatedProduct.getCategory());
			}

			repo.save(updatedProduct);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/product/{productId}")
	public ResponseEntity<Product> deleteProduct(@PathVariable Integer productId, Principal principal) {
		Optional<Product> product = repo.findBySellerUserIdAndProductId( userRepo.findByUsername(principal.getName()).get().getUserId(), productId);
		if(product.isPresent()) {
			repo.delete(product.get());
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}