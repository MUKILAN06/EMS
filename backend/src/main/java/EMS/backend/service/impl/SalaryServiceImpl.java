package EMS.backend.service.impl;

import EMS.backend.dto.SalaryRequest;
import EMS.backend.entity.Employee;
import EMS.backend.entity.Salary;
import EMS.backend.repository.EmployeeRepository;
import EMS.backend.repository.SalaryRepository;
import EMS.backend.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SalaryServiceImpl implements SalaryService {

    @Autowired
    private SalaryRepository salaryRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Salary setSalary(SalaryRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Salary salary = salaryRepository.findByEmployee(employee).orElse(new Salary());
        salary.setEmployee(employee);
        salary.setAmount(request.getAmount());
        salary.setNotes(request.getNotes());
        salary.setUpdatedAt(LocalDateTime.now());

        return salaryRepository.save(salary);
    }

    @Override
    public Salary getEmployeeSalary(Long userId) {
        Employee employee = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employee profile not found"));
        return salaryRepository.findByEmployee(employee)
                .orElseThrow(() -> new RuntimeException("Salary information not available"));
    }

    @Override
    public List<Salary> getAllSalaries() {
        return salaryRepository.findAll();
    }
}
