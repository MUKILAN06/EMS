package EMS.backend.service.impl;

import EMS.backend.config.JwtService;
import EMS.backend.dto.AuthRequest;
import EMS.backend.dto.AuthResponse;
import EMS.backend.entity.Role;
import EMS.backend.entity.User;
import EMS.backend.repository.UserRepository;
import EMS.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse login(AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );
        var user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        // Constructing a standard Spring Security User for JwtService generateToken
        var springUser = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList() // Authorities logic can be added if needed
        );

        var jwtToken = jwtService.generateToken(springUser);
        
        return AuthResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    @Override
    public String register(AuthRequest registerRequest) {
        // Use username if available, otherwise use part of email
        String username = registerRequest.getEmail().split("@")[0];
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        var user = User.builder()
                .username(username)
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.EMPLOYEE) // Default role
                .verified(true)
                .build();
        
        userRepository.save(user);
        return "User registered successfully";
    }
}
