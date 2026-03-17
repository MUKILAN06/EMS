package EMS.backend.service.impl;

import EMS.backend.dto.LeaveRequestDTO;
import EMS.backend.entity.LeaveRequest;
import EMS.backend.entity.LeaveStatus;
import EMS.backend.entity.User;
import EMS.backend.repository.LeaveRepository;
import EMS.backend.repository.UserRepository;
import EMS.backend.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveServiceImpl implements LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public LeaveRequest applyLeave(LeaveRequestDTO dto) {
        User user = userRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        LeaveRequest request = LeaveRequest.builder()
                .employee(user)
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .reason(dto.getReason())
                .status(LeaveStatus.PENDING_MANAGER) // Default status
                .build();
        return leaveRepository.save(request);
    }

    @Override
    public List<LeaveRequest> getAllLeaves() {
        return leaveRepository.findAll();
    }

    @Override
    public List<LeaveRequest> getLeavesByEmployee(Long employeeId) {
        User user = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return leaveRepository.findByEmployee(user);
    }

    @Override
    public LeaveRequest updateLeaveStatus(Long leaveId, LeaveStatus status, String rejectionReason) {
        LeaveRequest request = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        
        request.setStatus(status);
        if (status == LeaveStatus.REJECTED) {
            request.setRejectionReason(rejectionReason);
        }
        return leaveRepository.save(request);
    }

    @Override
    public List<LeaveRequest> getLeavesByStatus(LeaveStatus status) {
        return leaveRepository.findByStatus(status);
    }
}
