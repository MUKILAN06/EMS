package EMS.backend.service;

import EMS.backend.dto.IssueDTO;
import EMS.backend.entity.Issue;
import java.util.List;

public interface IssueService {
    Issue createIssue(IssueDTO dto, Long reporterId);
    List<Issue> getIssuesAssignedTo(Long userId);
    List<Issue> getIssuesReportedBy(Long userId);
    Issue resolveIssue(Long issueId, Long userId);
}
