package EMS.backend.service.impl;

import EMS.backend.dto.IssueDTO;
import EMS.backend.entity.Issue;
import EMS.backend.entity.User;
import EMS.backend.repository.IssueRepository;
import EMS.backend.repository.UserRepository;
import EMS.backend.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IssueServiceImpl implements IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Issue createIssue(IssueDTO dto, Long reporterId) {
        User reporter = userRepository.findById(reporterId)
                .orElseThrow(() -> new RuntimeException("Reporter not found"));

        User assignedTo = userRepository.findById(dto.getAssignedToId())
                .orElseThrow(() -> new RuntimeException("Assignee not found"));

        Issue issue = Issue.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .reportedBy(reporter)
                .assignedTo(assignedTo)
                .reportedAt(LocalDateTime.now())
                .resolved(false)
                .build();
        return issueRepository.save(issue);
    }

    @Override
    public List<Issue> getIssuesAssignedTo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return issueRepository.findByAssignedTo(user);
    }

    @Override
    public List<Issue> getIssuesReportedBy(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return issueRepository.findAll().stream()
                .filter(i -> i.getReportedBy().getId().equals(userId))
                .toList();
    }

    @Override
    public Issue resolveIssue(Long issueId, Long userId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        if (!issue.getAssignedTo().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized to resolve this issue");
        }

        issue.setResolved(true);
        issue.setResolvedAt(LocalDateTime.now());
        return issueRepository.save(issue);
    }
}
