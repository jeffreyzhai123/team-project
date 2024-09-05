package com.backend.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class AuthConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      return http
              .authorizeHttpRequests(registry -> {
                  registry.requestMatchers("/", "/login").permitAll();
                  registry.anyRequest().authenticated();
              })
              .oauth2Login(Customizer.withDefaults())
              .build();
  }
  
}
