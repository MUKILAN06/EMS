package EMS.backend.controller;

import EMS.backend.dto.WorkTaskDTO;
import EMS.backend.service.LeaveService;
import EMS.backend.service.TaskService;
import EMS.backend.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/manager")
@PreAuthorize("hasRole('MANAGER')")
public class ManagerController {

    @Autowired
    private LeaveService leaveService;
 
    @Autowired
    private TaskService taskService;

    @GetMapping("/leaves/pending")
    public ResponseEntity<?> getPendingLeaves(Authentication auth) {
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        return ResponseEntity.ok(leaveService.getPendingForManager(userDetails.getId()));
    }

    @PostMapping("/leave/approve/{id}")
    public ResponseEntity<?> approve(@PathVariable Long id) {
        return ResponseEntity.ok(leaveService.managerApprove(id));
    }

    @PostMapping("/leave/reject/{id}")
    public ResponseEntity<?> reject(@PathVariable Long id) {
        return ResponseEntity.ok(leaveService.managerReject(id));
    }
 
    @PostMapping("/task/assign")
    public ResponseEntity<?> assignTask(@RequestBody WorkTaskDTO dto, Authentication auth) {
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        return ResponseEntity.ok(taskService.assignTask(dto, userDetails.getId()));
    }
 
    @GetMapping("/tasks")
    public ResponseEntity<?> getMyAssignedTasks(Authentication auth) {
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        return ResponseEntity.ok(taskService.getTasksByManager(userDetails.getId()));
    }
}
