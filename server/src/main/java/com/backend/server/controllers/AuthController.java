package com.backend.server.controllers;

import java.security.Principal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  @RequestMapping("/")
  public String home() {
      return "Welcome!";
  }

  @RequestMapping("/user")
  public Principal user(Principal user) {
      return user;
  }
}
