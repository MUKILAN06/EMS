package EMS.backend.service;

import EMS.backend.dto.LeaveRequestDTO;
import EMS.backend.entity.LeaveRequest;
import EMS.backend.entity.LeaveStatus;
import java.util.List;

public interface LeaveService {
    LeaveRequest applyLeave(LeaveRequestDTO dto);
    List<LeaveRequest> getAllLeaves();
    List<LeaveRequest> getLeavesByEmployee(Long employeeId);
    LeaveRequest updateLeaveStatus(Long leaveId, LeaveStatus status, String rejectionReason);
    List<LeaveRequest> getLeavesByStatus(LeaveStatus status);
}
