package EMS.backend.controller;

import EMS.backend.entity.Role;
import EMS.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    LeaveRequestRepository leaveRequestRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    WorkTaskRepository workTaskRepository;

    @Autowired
    IssueRepository issueRepository;

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR', 'MANAGER', 'EMPLOYEE')")
    public ResponseEntity<?> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEmployees", employeeRepository.count());
        stats.put("totalUsers", userRepository.count());
        stats.put("totalDepartments", departmentRepository.count());
        stats.put("pendingLeaves", leaveRequestRepository.count());
        stats.put("activeTasks", workTaskRepository.count());
        stats.put("totalIssues", issueRepository.count());
        
        // Role distribution
        Map<String, Long> roles = new HashMap<>();
        roles.put("ADMIN", (long) userRepository.findByRole(Role.ADMIN).size());
        roles.put("HR", (long) userRepository.findByRole(Role.HR).size());
        roles.put("MANAGER", (long) userRepository.findByRole(Role.MANAGER).size());
        roles.put("EMPLOYEE", (long) userRepository.findByRole(Role.EMPLOYEE).size());
        stats.put("roleDistribution", roles);

        return ResponseEntity.ok(stats);
    }
}
