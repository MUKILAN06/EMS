package EMS.backend.controller;

import EMS.backend.dto.LeaveRequestDTO;
import EMS.backend.entity.LeaveRequest;
import EMS.backend.entity.LeaveStatus;
import EMS.backend.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @PostMapping("/apply")
    public ResponseEntity<LeaveRequest> applyLeave(@RequestBody LeaveRequestDTO dto) {
        return ResponseEntity.ok(leaveService.applyLeave(dto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<LeaveRequest>> getAllLeaves() {
        return ResponseEntity.ok(leaveService.getAllLeaves());
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<List<LeaveRequest>> getLeavesByEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(leaveService.getLeavesByEmployee(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LeaveRequest> updateLeaveStatus(
            @PathVariable Long id, 
            @RequestParam LeaveStatus status,
            @RequestParam(required = false) String rejectionReason) {
        return ResponseEntity.ok(leaveService.updateLeaveStatus(id, status, rejectionReason));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<LeaveRequest>> getLeavesByStatus(@PathVariable LeaveStatus status) {
        return ResponseEntity.ok(leaveService.getLeavesByStatus(status));
    }
}
