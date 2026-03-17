package EMS.backend.service;

import EMS.backend.dto.AuthRequest;
import EMS.backend.dto.AuthResponse;
import EMS.backend.dto.RegistrationRequest;

public interface AuthService {
    AuthResponse authenticate(AuthRequest request);
    AuthResponse register(RegistrationRequest request);
}
