// package com.pky.ecommerce.config;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.web.servlet.FilterRegistrationBean;
// import org.springframework.boot.web.servlet.RegistrationBean;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.authentication.configurers.userdetails.UserDetailsAwareConfigurer;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.password.NoOpPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

// import com.pky.ecommerce.models.Role;
// import com.pky.ecommerce.service.UserAuthService;

// @EnableWebSecurity
// @Configuration
// public class ApiSecurityConfig {
// 	@Autowired
// 	private UserAuthService userAuthService;

// 	@Autowired
// 	private ApiAuthenticationEntryPoint authEntryPoint;

// 	@Autowired
// 	private JwtAuthenticationFilter jwtAuthFilter;

// 	// @Autowired
// 	// public void configure(AuthenticationManagerBuilder auth) throws Exception {
// 	// 	auth.userDetailsService(userAuthService);
// 	// }

// 	// @Bean
// 	// UserDetailsService gDetailsService() {
// 	// 	return 
// 	// }

// 	@Bean
// 	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// 		http = http.csrf(csrf -> csrf.disable());
// 		http = http.cors(cors -> cors.disable());

// 		http = http
// 				.sessionManagement(management -> management
// 						.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

// 		// Set unauthorized requests exception handler
// 		http = http
// 				.exceptionHandling(cus -> cus.authenticationEntryPoint(authEntryPoint));

// 		// Set permissions on endpoints
// 		http.authorizeHttpRequests(req -> req.requestMatchers(new AntPathRequestMatcher("/api/public/**")).permitAll()
// 				// Our private endpoints
// 				.requestMatchers(new AntPathRequestMatcher("/api/auth/seller/**")).hasAuthority(Role.SELLER.toString())
// 				.requestMatchers(new AntPathRequestMatcher("/api/auth/consumer/**")).hasAuthority(Role.CONSUMER.toString())
// 				.anyRequest().authenticated()
// 				);
// 				// .httpBasic(null);

// 		// Add JWT token filter
// 		http.addFilterBefore(
// 				jwtAuthFilter,
// 				UsernamePasswordAuthenticationFilter.class);

// 		return http.build();

// 	}

// 	@Bean
// 	RegistrationBean jwtAuthFilterRegister(JwtAuthenticationFilter filter) {
// 		FilterRegistrationBean<JwtAuthenticationFilter> bean = new FilterRegistrationBean<>();
// 		bean.setFilter(filter);
// 		bean.addUrlPatterns("/api/auth/consumer/*", "/api/auth/seller/*");
// 		return bean;
// 	}

// 	// @Bean
// 	// AuthenticationManager authenticationManagerBean() throws Exception {
// 	// return super.authenticationManagerBean();
// 	// }

// 	@Bean
// 	AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
// 		return http.getSharedObject(AuthenticationManagerBuilder.class)
// 				.build();
// 	}

// 	@Bean
// 	PasswordEncoder passwordEncoder() {
// 		return NoOpPasswordEncoder.getInstance();
// 	}

// }
