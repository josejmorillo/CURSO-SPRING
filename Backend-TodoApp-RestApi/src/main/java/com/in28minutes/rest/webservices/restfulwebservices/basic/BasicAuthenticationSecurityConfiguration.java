package com.in28minutes.rest.webservices.restfulwebservices.basic;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

//@Configuration
public class BasicAuthenticationSecurityConfiguration {

    //Filter chain
    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception {
        //All request require authentication
        return http
                .authorizeHttpRequests(auth ->
                        auth
                                //Permite todas las Options para cualquier request. Salvando este error: Response to preflight request doesn't pass access control check
                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                .anyRequest().authenticated())
                //Enable http basic authentication
                .httpBasic(Customizer.withDefaults())
                //Create a Stateless Session
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                //disabling csrf
                .csrf(csrf -> csrf.disable())
                .build();
    }
}
