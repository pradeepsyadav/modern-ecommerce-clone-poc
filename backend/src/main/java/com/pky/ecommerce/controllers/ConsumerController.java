package com.pky.ecommerce.controllers;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pky.ecommerce.models.Cart;
import com.pky.ecommerce.models.CartProduct;
import com.pky.ecommerce.models.Product;
import com.pky.ecommerce.repo.CartProductRepo;
import com.pky.ecommerce.repo.CartRepo;
import com.pky.ecommerce.repo.UserRepo;

@RestController
@RequestMapping("/api/auth/consumer")
@CrossOrigin(origins = "*")
public class ConsumerController {

	@Autowired
	private CartRepo repo;

	@Autowired
	private CartProductRepo cartProductRepo;


	@GetMapping("/cart")
	public ResponseEntity<Object> getCart(Principal principal) {
		return ResponseEntity
			.ok()
			.body(repo.findByUserUsername(principal.getName()).orElse(new Cart()));
	}

	@PostMapping("/cart")
	public ResponseEntity<Object> postCart(@RequestBody Product product ,Principal principal) {
		Cart c = repo.findByUserUsername(principal.getName()).get();
		if ( c.getCartProducts().stream().filter(p -> p.getProduct().getProductId() == product.getProductId()).count() > 0) {
			return ResponseEntity.status(409).build();
		} else {
			CartProduct cp = new CartProduct(c, product, 1);
			cartProductRepo.save(cp);
			c.getCartProducts().add(cp);
			repo.save(c);
			return ResponseEntity.ok().build();
		}
	}

	@PutMapping("/cart")
	public ResponseEntity<Object> putCart(@RequestBody CartProduct updatedCartProduct, Principal principal) {

		Cart existingCart = repo.findByUserUsername(principal.getName()).get();
		Optional<CartProduct> desiredCartProduct = existingCart.getCartProducts()
												.stream().filter(cp -> cp.getProduct().getProductId() == updatedCartProduct.getProduct().getProductId()).findFirst();

		if ( desiredCartProduct.isPresent() ) {
			if (updatedCartProduct.getQuantity() == 0) {
				cartProductRepo.delete(desiredCartProduct.get());
				existingCart.getCartProducts().removeIf(cp -> cp.getProduct().getProductId() == updatedCartProduct.getProduct().getProductId());
				repo.save(existingCart);
			} else {
				desiredCartProduct.get().setQuantity(updatedCartProduct.getQuantity());
				cartProductRepo.save(desiredCartProduct.get());
				repo.save(existingCart);
			}
		} else {
			CartProduct cp = new CartProduct(existingCart, updatedCartProduct.getProduct(), updatedCartProduct.getQuantity());
			cartProductRepo.save(cp);
		}

		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/cart")
	public ResponseEntity<Object> deleteCart(@RequestBody Product product, Principal principal) {
		Cart existingCart = repo.findByUserUsername(principal.getName()).get();
		CartProduct desiredCartProduct = existingCart.getCartProducts()
												.stream().filter(cp -> cp.getProduct().getProductId() == product.getProductId()).findFirst().get();
		cartProductRepo.delete(desiredCartProduct);
		existingCart.getCartProducts().removeIf(cp -> cp.getProduct().getProductId() == product.getProductId());
		repo.save(existingCart);
		return ResponseEntity.ok().build();
	}

}