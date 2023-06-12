package com.pky.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class EcommerceCloneApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceCloneApplication.class, args);
	}

}
