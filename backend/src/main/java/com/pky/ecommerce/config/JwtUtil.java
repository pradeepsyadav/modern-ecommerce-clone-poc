package com.pky.ecommerce.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pky.ecommerce.models.User;
import com.pky.ecommerce.repo.UserRepo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	// @Value("jwt.secret")
	private final static SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	@Autowired
	private UserRepo userRepo;

	public User getUser(final String token) {
		Jws<Claims> jwt = Jwts.parserBuilder()
			.setSigningKey(SECRET_KEY.getEncoded())
			.build()
			.parseClaimsJws(token);

		Claims claims = jwt.getBody();
		String subject = claims.getSubject();

		if(subject == null || subject.equalsIgnoreCase("")) {
			throw new RuntimeException("User is blank please Login again");
		}


		return userRepo.findByUsername(subject).orElseThrow(() -> new RuntimeException("User is blank please Login again"));

	}

	public String generateToken(String username) {

		long nowMillis = System.currentTimeMillis();
    	Date now = new Date(nowMillis);
	
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
		// byte[] apiKeySecretBytes = getKey();//DatatypeConverter.parseBase64Binary(SECRET_KEY);
		// Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

		JwtBuilder builder = Jwts.builder()
            .setIssuedAt(now)
            .setSubject(username)
            .setIssuer("spring-web")
            .signWith(SECRET_KEY, signatureAlgorithm);

		return builder.compact();
	}

	public boolean validateToken(final String token) {
		try {
			Jwts.parserBuilder()
			.setSigningKey(SECRET_KEY.getEncoded())
			.build()
			.parse(token);
			return true;
		} catch (Exception e) {
			System.out.println("Error while validating json token" + e.getMessage());
			return false;
		}
		
	}

	// private byte[] getKey() {
	// 	return SECRET_KEY;
	// }
}
