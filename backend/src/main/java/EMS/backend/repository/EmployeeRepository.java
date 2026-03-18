package EMS.backend.repository;

import EMS.backend.entity.Employee;
import EMS.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByUser(User user);
    Optional<Employee> findByUserId(Long userId);
}
