package EMS.backend.service;

import EMS.backend.dto.AuthRequest;
import EMS.backend.dto.AuthResponse;

public interface AuthService {
    AuthResponse login(AuthRequest authRequest);
    String register(AuthRequest registerRequest); // Simplified for now using AuthRequest if needed, or I'll add more fields
}
