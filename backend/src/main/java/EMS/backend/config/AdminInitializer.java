package EMS.backend.config;

import EMS.backend.entity.Role;
import EMS.backend.entity.User;
import EMS.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@ems.com")
                    .password(encoder.encode("password2004"))
                    .role(Role.ADMIN)
                    .verified(true)
                    .build();
            userRepository.save(admin);
            System.out.println("Default Admin account created: admin / password2004");
        }
    }
}
