package EMS.backend.service;

import EMS.backend.entity.Employee;
import java.util.List;

public interface EmployeeService {
    Employee getEmployeeById(Long id);
    Employee getEmployeeByUserId(Long userId);
    List<Employee> getAllEmployees();
    Employee saveEmployee(Employee employee);
    void deleteEmployee(Long id);
}
