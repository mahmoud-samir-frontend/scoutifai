// AUTO-GENERATED from player-performance-frontend-demo.xlsx.
// Product scope, permissions, navigation, APIs and exclusions.

export const FRONTEND_FEATURES = [
  {
    "Module": "Access & Roles",
    "Feature": "Role-based application access",
    "Description": "Login-aware UI with permissions for Admin, Manager, Coach, Fitness Coach, Doctor, Physiotherapist, Player, Parent and Scout.",
    "Frontend UI To Build": "Auth shell, role-aware navigation, protected routes, record-level visibility states.",
    "Main Entities": "User",
    "API / Data Source": "roleTemplates.json",
    "Roles": "Super Admin, Organization Admin, Club Admin, Team Manager, Coach, Fitness Coach, Doctor, Physiotherapist, Player, Parent, Scout",
    "Priority": "Must Have",
    "Primary Users": "All user types",
    "Implementation Notes": "Hide unavailable modules/actions by role; preserve org/club/team scoping.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Access & Roles",
    "Feature": "Sports user profile management",
    "Description": "Manage sports-specific user information: user type, organization, club, sport, position, teams, status, profile photo and specialty fields.",
    "Frontend UI To Build": "User profile form, profile detail, account status badge, team assignment selector.",
    "Main Entities": "User, SportsUserProfile",
    "API / Data Source": "User fields and layouts",
    "Roles": "Admins, Coaches, Staff, Players, Parents, Scouts",
    "Priority": "Must Have",
    "Primary Users": "Admins",
    "Implementation Notes": "Frontend should conditionally show coach, scout, fitness, parent, and player fields by selected user type.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Access & Roles",
    "Feature": "Create login account from sports record",
    "Description": "Allow admins to create/provision login accounts from players, coaches, staff or related records.",
    "Frontend UI To Build": "Action button, confirmation modal, temporary password display/copy control.",
    "Main Entities": "SportsPlayer, SportsCoach, SportsStaff, User",
    "API / Data Source": "POST /:entityType/:id/createLoginAccount",
    "Roles": "Admins",
    "Priority": "Should Have",
    "Primary Users": "Admins",
    "Implementation Notes": "Uses custom login password field view; password must not appear in list/detail after provisioning.",
    "Backend Status": "Custom API exists",
    "Scope": "Included"
  },
  {
    "Module": "Organization Setup",
    "Feature": "Organization and club management",
    "Description": "Manage organizations and clubs as the top-level structure for all sports records.",
    "Frontend UI To Build": "Organization list/detail/form; Club list/detail/form; filters by status/ownership.",
    "Main Entities": "SportsOrganization, SportsClub",
    "API / Data Source": "Entity CRUD",
    "Roles": "Organization Admin, Club Admin, Super Admin",
    "Priority": "Must Have",
    "Primary Users": "Admins",
    "Implementation Notes": "These records drive access scoping and dropdowns across most screens.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Organization Setup",
    "Feature": "Sports catalog",
    "Description": "Maintain sports, positions and sport-specific position metadata.",
    "Frontend UI To Build": "Sport list/detail/form; Position list/detail/form; sport-linked selectors.",
    "Main Entities": "Sport, SportPosition",
    "API / Data Source": "Entity CRUD",
    "Roles": "Admins, Team Managers",
    "Priority": "Must Have",
    "Primary Users": "Admins, Managers",
    "Implementation Notes": "Used by players, teams, tests and evaluations.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Organization Setup",
    "Feature": "Team management",
    "Description": "Create teams with organization, club, sport, coach, season/category and team roster relationships.",
    "Frontend UI To Build": "Team list/detail/form, roster tab, assigned staff/coach selectors.",
    "Main Entities": "SportsTeam, SportsPlayerTeam, User",
    "API / Data Source": "Entity CRUD",
    "Roles": "Team Manager, Coach, Club Admin",
    "Priority": "Must Have",
    "Primary Users": "Managers, Coaches",
    "Implementation Notes": "Support relationship panels for players, sessions, matches and attendance.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Players",
    "Feature": "Player profile management",
    "Description": "Create and maintain complete player profiles with personal, sports, contract, medical availability, public profile, strengths and notes.",
    "Frontend UI To Build": "Player list, player detail, player edit/create, profile photo, status chips, related tabs.",
    "Main Entities": "SportsPlayer",
    "API / Data Source": "Entity CRUD",
    "Roles": "Admins, Team Managers, Coaches, Doctors, Players limited own profile",
    "Priority": "Must Have",
    "Primary Users": "All sports users",
    "Implementation Notes": "Important first screen for player-centric navigation; include list filters by org, club, sport, status and medical status.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Players",
    "Feature": "Team roster and player history",
    "Description": "Track player membership in teams with status, shirt number, dates and history.",
    "Frontend UI To Build": "Roster grid, add/remove player modal, player team history table.",
    "Main Entities": "SportsPlayerTeam, SportsPlayer, SportsTeam",
    "API / Data Source": "Entity CRUD",
    "Roles": "Team Manager, Coach, Club Admin",
    "Priority": "Must Have",
    "Primary Users": "Managers, Coaches",
    "Implementation Notes": "Useful as both a standalone module and a relationship tab under player/team.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Players",
    "Feature": "Parent/player relations",
    "Description": "Link parents to players and control what parents can view.",
    "Frontend UI To Build": "Parent relation list/form, linked player selector, permission toggles.",
    "Main Entities": "ParentPlayerRelation, User, SportsPlayer",
    "API / Data Source": "Entity CRUD",
    "Roles": "Admins, Parents limited linked players",
    "Priority": "Should Have",
    "Primary Users": "Admins, Parents",
    "Implementation Notes": "Use flags to limit parent access to performance, medical, videos or tasks as configured.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Training",
    "Feature": "Training session scheduling",
    "Description": "Plan sessions with team, coach, date/time, location, type, intensity, objectives, status and notes.",
    "Frontend UI To Build": "Training calendar/list, session detail, create/edit modal, filters by team/coach/status.",
    "Main Entities": "TrainingSession",
    "API / Data Source": "Entity CRUD",
    "Roles": "Team Manager, Coach",
    "Priority": "Must Have",
    "Primary Users": "Coaches, Managers, Players",
    "Implementation Notes": "Calendar view is recommended for frontend even if backend is CRUD.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Training",
    "Feature": "Generate team attendance",
    "Description": "Generate attendance rows for a training session or team players.",
    "Frontend UI To Build": "Generate attendance action, progress/toast, attendance roster grid.",
    "Main Entities": "SportsTeam, TrainingAttendance",
    "API / Data Source": "POST /SportsTeam/:id/generateAttendance",
    "Roles": "Team Manager, Coach",
    "Priority": "Should Have",
    "Primary Users": "Coaches, Managers",
    "Implementation Notes": "Add explicit empty/error states when no active roster exists.",
    "Backend Status": "Custom API exists",
    "Scope": "Included"
  },
  {
    "Module": "Training",
    "Feature": "Attendance tracking",
    "Description": "Record player attendance, arrival status, minutes, absence reason and coach notes.",
    "Frontend UI To Build": "Attendance table with inline status editing, bulk update, filters by player/session/status.",
    "Main Entities": "TrainingAttendance, TrainingSession, SportsPlayer",
    "API / Data Source": "Entity CRUD",
    "Roles": "Coach, Team Manager",
    "Priority": "Must Have",
    "Primary Users": "Coaches, Managers",
    "Implementation Notes": "Frontend should support quick status changes without opening every record.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Training",
    "Feature": "Training task management",
    "Description": "Assign and monitor training tasks linked to sessions, players, coaches or teams.",
    "Frontend UI To Build": "Task board/list, task detail, assignment form, status controls.",
    "Main Entities": "TrainingTask, PlayerTask",
    "API / Data Source": "Entity CRUD",
    "Roles": "Coach, Fitness Coach, Player",
    "Priority": "Should Have",
    "Primary Users": "Coaches, Players",
    "Implementation Notes": "Use due date/status priority patterns; expose player-specific task list.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Matches",
    "Feature": "Match management",
    "Description": "Manage matches with team, opponent, date, venue, competition, status, scores and notes.",
    "Frontend UI To Build": "Match list/calendar, match detail, create/edit form, status and score controls.",
    "Main Entities": "SportsMatch",
    "API / Data Source": "Entity CRUD",
    "Roles": "Team Manager, Coach",
    "Priority": "Must Have",
    "Primary Users": "Coaches, Managers, Players",
    "Implementation Notes": "Relationship tabs should show videos and player statistics.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Matches",
    "Feature": "Player match statistics",
    "Description": "Capture per-player match metrics such as participation and sport-specific performance numbers.",
    "Frontend UI To Build": "Match stats grid, player selector, stat edit form, bulk entry flow.",
    "Main Entities": "MatchPlayerStatistic, SportsMatch, SportsPlayer",
    "API / Data Source": "Entity CRUD",
    "Roles": "Coach, Team Manager, Data-entry staff",
    "Priority": "Must Have",
    "Primary Users": "Coaches, Managers",
    "Implementation Notes": "Design for fast row entry after match completion.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Performance Records",
    "Feature": "Measurements",
    "Description": "Record height/weight/body and other player measurements over time.",
    "Frontend UI To Build": "Measurement list/form, player measurement tab, date-based filters.",
    "Main Entities": "PlayerMeasurement",
    "API / Data Source": "Entity CRUD",
    "Roles": "Fitness Coach, Coach, Player read-only",
    "Priority": "Must Have",
    "Primary Users": "Fitness, Coaches, Players",
    "Implementation Notes": "This is raw record management only; no dashboard or trend analysis included.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Performance Records",
    "Feature": "Sport test definitions",
    "Description": "Configure reusable physical/technical test definitions with units, direction and sport context.",
    "Frontend UI To Build": "Test definition list/form, unit selector, active status.",
    "Main Entities": "SportTestDefinition",
    "API / Data Source": "Entity CRUD",
    "Roles": "Admins, Fitness Coach",
    "Priority": "Must Have",
    "Primary Users": "Admins, Fitness",
    "Implementation Notes": "Needed before entering player test results.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Performance Records",
    "Feature": "Player test results",
    "Description": "Enter test results for players using configured test definitions.",
    "Frontend UI To Build": "Test result entry grid/form, player test tab, filters by test/date/team.",
    "Main Entities": "PlayerTestResult, SportTestDefinition, SportsPlayer",
    "API / Data Source": "Entity CRUD",
    "Roles": "Fitness Coach, Coach, Player read-only",
    "Priority": "Must Have",
    "Primary Users": "Fitness, Coaches, Players",
    "Implementation Notes": "Support attachments/notes if available from field metadata.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Performance Records",
    "Feature": "Evaluation criteria setup",
    "Description": "Maintain evaluation criteria used by player evaluations.",
    "Frontend UI To Build": "Criteria list/form, category/weight controls.",
    "Main Entities": "EvaluationCriteria",
    "API / Data Source": "Entity CRUD",
    "Roles": "Admins, Coaches",
    "Priority": "Should Have",
    "Primary Users": "Admins, Coaches",
    "Implementation Notes": "Use as configuration/reference data for evaluation forms.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Performance Records",
    "Feature": "Player evaluations",
    "Description": "Create evaluations with technical, physical, tactical, mental, behavioral, discipline and overall scores plus comments and recommendations.",
    "Frontend UI To Build": "Evaluation list/form, score inputs, status flow, player/team filters.",
    "Main Entities": "PlayerEvaluation, PlayerEvaluationItem",
    "API / Data Source": "Entity CRUD",
    "Roles": "Coach, Team Manager, Scout, Player read-only as allowed",
    "Priority": "Must Have",
    "Primary Users": "Coaches, Managers, Players",
    "Implementation Notes": "This is form/record handling; dashboards/analysis are excluded.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Wellness",
    "Feature": "Player wellness self-reporting",
    "Description": "Players submit wellness records such as readiness, fatigue/sleep/mood/soreness style fields and notes.",
    "Frontend UI To Build": "Mobile-friendly wellness form, self-submit page, player wellness history.",
    "Main Entities": "PlayerWellness",
    "API / Data Source": "POST /PlayerWellness/self; Entity CRUD",
    "Roles": "Player, Fitness Coach, Coach",
    "Priority": "Must Have",
    "Primary Users": "Players, Coaches, Fitness",
    "Implementation Notes": "Use a very fast mobile form; the existing custom view is only a placeholder.",
    "Backend Status": "Custom API exists",
    "Scope": "Included"
  },
  {
    "Module": "Medical",
    "Feature": "Injury management",
    "Description": "Record injuries with body area, side, severity, status, diagnosis, cause, doctor, return dates, availability and confidential notes.",
    "Frontend UI To Build": "Injury list/form, player injury tab, availability badge, medical attachment upload.",
    "Main Entities": "PlayerInjury",
    "API / Data Source": "Entity CRUD",
    "Roles": "Doctor, Physiotherapist, Coach limited availability",
    "Priority": "Must Have",
    "Primary Users": "Medical staff, Coaches",
    "Implementation Notes": "Use the custom availability badge for fast list scanning; protect confidential notes by role.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Medical",
    "Feature": "Rehabilitation plans",
    "Description": "Create recovery plans linked to player injuries with goals, start/end dates, owner and status.",
    "Frontend UI To Build": "Rehab plan list/form, injury/player relationship tab, status tracker.",
    "Main Entities": "RehabilitationPlan, PlayerInjury",
    "API / Data Source": "Entity CRUD",
    "Roles": "Doctor, Physiotherapist",
    "Priority": "Must Have",
    "Primary Users": "Medical staff",
    "Implementation Notes": "Should connect clearly to rehab sessions.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Medical",
    "Feature": "Rehabilitation sessions",
    "Description": "Track each rehab session, exercises, pain/effort feedback, attendance and medical notes.",
    "Frontend UI To Build": "Rehab session list/form, plan timeline, session status controls.",
    "Main Entities": "RehabilitationSession, RehabilitationPlan",
    "API / Data Source": "Entity CRUD",
    "Roles": "Physiotherapist, Doctor, Player read-only as allowed",
    "Priority": "Should Have",
    "Primary Users": "Medical staff, Players",
    "Implementation Notes": "Design as a chronological timeline under each plan.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Video",
    "Feature": "Sports video library",
    "Description": "Upload or link videos with type, team, match/session, visibility, thumbnail, duration, processing status and metadata.",
    "Frontend UI To Build": "Video list/grid, upload form, video detail/player, visibility controls.",
    "Main Entities": "SportsVideo",
    "API / Data Source": "Entity CRUD",
    "Roles": "Admins, Coaches, Players, Scouts as allowed",
    "Priority": "Must Have",
    "Primary Users": "Coaches, Players, Scouts",
    "Implementation Notes": "External storage fields exist but README says FFmpeg/external storage are disabled for MVP.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Video",
    "Feature": "Player video links",
    "Description": "Associate videos to one or more players with role/context notes.",
    "Frontend UI To Build": "Video-player linking modal, player video tab, video related players panel.",
    "Main Entities": "PlayerVideoLink, SportsVideo, SportsPlayer",
    "API / Data Source": "Entity CRUD",
    "Roles": "Coach, Team Manager, Scout",
    "Priority": "Must Have",
    "Primary Users": "Coaches, Scouts, Players",
    "Implementation Notes": "Important for player detail pages and player-only access.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Video",
    "Feature": "Video comments",
    "Description": "Add comments to videos, including timeline-related discussion.",
    "Frontend UI To Build": "Comment thread, add comment input, permissions-aware delete/edit controls.",
    "Main Entities": "VideoComment, SportsVideo",
    "API / Data Source": "POST /SportsVideo/:id/comments; Entity CRUD",
    "Roles": "Coach, Player, Scout, Medical as allowed",
    "Priority": "Should Have",
    "Primary Users": "Video users",
    "Implementation Notes": "Existing custom comments view is minimal and should be built into a polished component.",
    "Backend Status": "Custom API exists",
    "Scope": "Included"
  },
  {
    "Module": "Video",
    "Feature": "Timeline tags",
    "Description": "Mark key moments on videos with timecode, type and notes.",
    "Frontend UI To Build": "Timeline marker rail, tag create/edit form, tag list.",
    "Main Entities": "VideoTimelineTag, SportsVideo",
    "API / Data Source": "Entity CRUD",
    "Roles": "Coach, Scout, Player limited",
    "Priority": "Should Have",
    "Primary Users": "Coaches, Scouts",
    "Implementation Notes": "Use precise seconds/timecode input; allow jumping video playback to tag.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Video",
    "Feature": "Video clips",
    "Description": "Manage clips generated from source video with queue/status fields.",
    "Frontend UI To Build": "Clip list, clip detail, clip status badge, source video relation.",
    "Main Entities": "VideoClip, SportsVideo",
    "API / Data Source": "Entity CRUD; scheduled queue job",
    "Roles": "Coach, Scout, Admin",
    "Priority": "Could Have",
    "Primary Users": "Coaches, Scouts",
    "Implementation Notes": "Scheduled job exists every 5 minutes; MVP notes say FFmpeg is disabled, so expose status carefully.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Notifications",
    "Feature": "Sports notifications",
    "Description": "Create and display notifications for players/staff/teams with read/status handling.",
    "Frontend UI To Build": "Notification center, list/detail, read/unread badges, recipient targeting form.",
    "Main Entities": "SportsNotification",
    "API / Data Source": "Entity CRUD",
    "Roles": "All roles by recipient",
    "Priority": "Should Have",
    "Primary Users": "All users",
    "Implementation Notes": "Frontend should include a compact notification indicator and full list page.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Common UX",
    "Feature": "Standard record pages",
    "Description": "Every included entity needs list, create, edit, detail, filter, relationship and mass-update behavior where metadata provides layouts.",
    "Frontend UI To Build": "Reusable CRUD shell, data table, filters, form renderer, relationship tabs.",
    "Main Entities": "All included entities",
    "API / Data Source": "Layouts + entity metadata",
    "Roles": "By ACL",
    "Priority": "Must Have",
    "Primary Users": "All users",
    "Implementation Notes": "Keep dashboard and analysis routes out of this scope.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Common UX",
    "Feature": "Search, filters and sorting",
    "Description": "Support text search, filters, list columns and quick lookup based on each entity layout and text filter fields.",
    "Frontend UI To Build": "Search box, advanced filters, sortable data tables, saved filter affordance if framework supports it.",
    "Main Entities": "All included entities",
    "API / Data Source": "Entity collection + filters layout",
    "Roles": "By ACL",
    "Priority": "Must Have",
    "Primary Users": "All users",
    "Implementation Notes": "Use metadata list/filter layouts as the source of truth.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  },
  {
    "Module": "Common UX",
    "Feature": "Attachments and media fields",
    "Description": "Render and manage image, file, URL and attachment fields consistently across players, injuries, evaluations and videos.",
    "Frontend UI To Build": "Image uploader, file uploader, URL preview, attachment viewer.",
    "Main Entities": "SportsPlayer, PlayerInjury, PlayerEvaluation, SportsVideo",
    "API / Data Source": "Entity fields",
    "Roles": "By ACL",
    "Priority": "Should Have",
    "Primary Users": "All users",
    "Implementation Notes": "Respect sensitive medical attachments.",
    "Backend Status": "Backend metadata exists",
    "Scope": "Included"
  }
] as const;

export const DOCUMENTED_ROLES = [
  {
    "Role": "Super Admin",
    "Description": "Full access to all sports records.",
    "Frontend Notes": "Frontend should map this role to navigation visibility, available actions, and record scope."
  },
  {
    "Role": "Organization Admin",
    "Description": "Full access within organization.",
    "Frontend Notes": "Frontend should map this role to navigation visibility, available actions, and record scope."
  },
  {
    "Role": "Club Admin",
    "Description": "Full access within club.",
    "Frontend Notes": "Frontend should map this role to navigation visibility, available actions, and record scope."
  },
  {
    "Role": "Team Manager",
    "Description": "Manage assigned teams, players, sessions and matches.",
    "Frontend Notes": "Frontend should map this role to navigation visibility, available actions, and record scope."
  },
  {
    "Role": "Coach",
    "Description": "Manage training, attendance, tasks, evaluations and permitted injury availability.",
    "Frontend Notes": "Frontend should map this role to navigation visibility, available actions, and record scope."
  },
  {
    "Role": "Fitness Coach",
    "Description": "Manage measurements, fitness tests, wellness and fitness tasks.",
    "Frontend Notes": "Frontend should map this role to navigation visibility, available actions, and record scope."
  },
  {
    "Role": "Doctor",
    "Description": "Manage injuries, rehabilitation, attachments and availability.",
    "Frontend Notes": "Frontend should map this role to navigation visibility, available actions, and record scope."
  },
  {
    "Role": "Physiotherapist",
    "Description": "Manage rehabilitation and assigned medical recovery data.",
    "Frontend Notes": "Frontend should map this role to navigation visibility, available actions, and record scope."
  },
  {
    "Role": "Player",
    "Description": "Own profile, permitted evaluations, measurements, tasks, wellness and videos.",
    "Frontend Notes": "Frontend should map this role to navigation visibility, available actions, and record scope."
  },
  {
    "Role": "Parent",
    "Description": "Linked players only through ParentPlayerRelation flags.",
    "Frontend Notes": "Frontend should map this role to navigation visibility, available actions, and record scope."
  },
  {
    "Role": "Scout",
    "Description": "Public or scout-visible players/videos and private scouting notes.",
    "Frontend Notes": "Frontend should map this role to navigation visibility, available actions, and record scope."
  }
] as const;

export const DOCUMENTED_NAVIGATION = [
  {
    "Entity": "EvaluationCriteria",
    "Label": "Evaluation Criteria",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "MatchPlayerStatistic",
    "Label": "Match Player Statistic",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "PlayerEvaluation",
    "Label": "Player Evaluation",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "PlayerEvaluationItem",
    "Label": "Player Evaluation Item",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "PlayerInjury",
    "Label": "Player Injury",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "PlayerMeasurement",
    "Label": "Player Measurement",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "PlayerTask",
    "Label": "Player Task",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "PlayerTestResult",
    "Label": "Player Test Result",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "PlayerVideoLink",
    "Label": "Player Video Link",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "PlayerWellness",
    "Label": "Player Wellness",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "RehabilitationPlan",
    "Label": "Rehabilitation Plan",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "RehabilitationSession",
    "Label": "Rehabilitation Session",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "Sport",
    "Label": "Sport",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "SportPosition",
    "Label": "Sport Position",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "SportTestDefinition",
    "Label": "Sport Test Definition",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "SportsClub",
    "Label": "Sports Club",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "SportsMatch",
    "Label": "Sports Match",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "SportsNotification",
    "Label": "Sports Notification",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "SportsOrganization",
    "Label": "Sports Organization",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "SportsPlayerTeam",
    "Label": "Sports Player Team",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "SportsTeam",
    "Label": "Sports Team",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "SportsVideo",
    "Label": "Sports Video",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "TrainingAttendance",
    "Label": "Training Attendance",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "TrainingSession",
    "Label": "Training Session",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "TrainingTask",
    "Label": "Training Task",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "VideoClip",
    "Label": "Video Clip",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "VideoComment",
    "Label": "Video Comment",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  },
  {
    "Entity": "VideoTimelineTag",
    "Label": "Video Timeline Tag",
    "Section": "SCOUTIFAI",
    "List Layout": "Yes",
    "Detail Layout": "Yes",
    "Edit Layout": "Yes",
    "Filters Layout": "Yes"
  }
] as const;

export const DOCUMENTED_API_COMPONENTS = [
  {
    "Type/Method": "POST",
    "Name / Route": "/SportsTeam/:id/generateAttendance",
    "Purpose": "Generate team attendance records",
    "Feature Area": "Training attendance",
    "Scope": "Included"
  },
  {
    "Type/Method": "POST",
    "Name / Route": "/SportsVideo/:id/comments",
    "Purpose": "Add a comment to a video",
    "Feature Area": "Video comments",
    "Scope": "Included"
  },
  {
    "Type/Method": "POST",
    "Name / Route": "/:entityType/:id/createLoginAccount",
    "Purpose": "Create/provision a login account from a sports record",
    "Feature Area": "Access and accounts",
    "Scope": "Included"
  },
  {
    "Type/Method": "POST",
    "Name / Route": "/PlayerWellness/self",
    "Purpose": "Submit own wellness record",
    "Feature Area": "Player wellness self-reporting",
    "Scope": "Included"
  },
  {
    "Type/Method": "GET",
    "Name / Route": "/SportsPlayer/:id/dashboard",
    "Purpose": "Player dashboard data",
    "Feature Area": "Dashboard",
    "Scope": "Excluded by request"
  },
  {
    "Type/Method": "GET",
    "Name / Route": "/SportsTeam/:id/dashboard",
    "Purpose": "Team dashboard data",
    "Feature Area": "Dashboard",
    "Scope": "Excluded by request"
  },
  {
    "Type/Method": "POST",
    "Name / Route": "/User/:id/intelligence/analyze",
    "Purpose": "Run intelligence analysis for a user",
    "Feature Area": "Analysis",
    "Scope": "Excluded by request"
  },
  {
    "Type/Method": "scoutifai:views/fields/injury-availability-badge",
    "Name / Route": "Availability/status badge for player injuries",
    "Purpose": "Medical > Injury list/detail",
    "Feature Area": "Included",
    "Scope": ""
  },
  {
    "Type/Method": "scoutifai:views/fields/login-password",
    "Name / Route": "Temporary login password field",
    "Purpose": "Access > Create login account",
    "Feature Area": "Included",
    "Scope": ""
  },
  {
    "Type/Method": "scoutifai:views/video-timeline-comments",
    "Name / Route": "Video timeline comment placeholder",
    "Purpose": "Video > Comments/timeline",
    "Feature Area": "Included but needs production UI",
    "Scope": ""
  },
  {
    "Type/Method": "scoutifai:views/wellness-form",
    "Name / Route": "Wellness form placeholder",
    "Purpose": "Wellness > Self-reporting",
    "Feature Area": "Included but needs production UI",
    "Scope": ""
  },
  {
    "Type/Method": "scoutifai:views/player-summary-card",
    "Name / Route": "Player summary card",
    "Purpose": "Player profile surfaces",
    "Feature Area": "Included",
    "Scope": ""
  },
  {
    "Type/Method": "scoutifai:views/performance-trend-chart",
    "Name / Route": "Performance trend chart",
    "Purpose": "Analysis/charting",
    "Feature Area": "Excluded by request",
    "Scope": ""
  },
  {
    "Type/Method": "scoutifai:views/dashlets/sports-intelligence-analysis",
    "Name / Route": "Sports intelligence analysis dashlet",
    "Purpose": "Dashboard/analysis",
    "Feature Area": "Excluded by request",
    "Scope": ""
  }
] as const;

export const DOCUMENTED_EXCLUSIONS = [
  {
    "Type": "Dashboard",
    "Name": "Player dashboard route",
    "Source": "GET /SportsPlayer/:id/dashboard"
  },
  {
    "Type": "Dashboard",
    "Name": "Team dashboard route",
    "Source": "GET /SportsTeam/:id/dashboard"
  },
  {
    "Type": "Analysis",
    "Name": "User intelligence analysis route",
    "Source": "POST /User/:id/intelligence/analyze"
  },
  {
    "Type": "Analysis",
    "Name": "Sports Intelligence Config entity",
    "Source": "SportsIntelligenceConfig"
  },
  {
    "Type": "Analysis",
    "Name": "Sports Intelligence Snapshot entity",
    "Source": "SportsIntelligenceSnapshot"
  },
  {
    "Type": "Analysis",
    "Name": "Sports Intelligence Alert entity",
    "Source": "SportsIntelligenceAlert"
  },
  {
    "Type": "Analysis",
    "Name": "Performance trend chart component",
    "Source": "performance-trend-chart.js"
  },
  {
    "Type": "Dashboard/Analysis",
    "Name": "Sports intelligence analysis dashlet",
    "Source": "dashlets/sports-intelligence-analysis.js"
  }
] as const;

export const USER_CAPABILITIES = [
  {
    "User Type": "SuperAdmin",
    "Account Type": "Regular/admin account",
    "What They Can Do": "Full system administration across all organizations, clubs, users, roles, sports setup, teams, players, staff, training, matches, performance records, medical records, videos, notifications and configuration records.",
    "Record Scope": "All records in all organizations.",
    "Main Responsibilities": "System administration, user provisioning, role assignment, data correction, global setup.",
    "Frontend Screens": "All included SCOUTIFAI screens except dashboard/analysis items removed from this scope.",
    "Restrictions / Security": "No sports-module restriction; normal platform admin/audit rules still apply.",
    "Frontend Implementation Notes": "Show full navigation and all create/edit/delete/actions."
  },
  {
    "User Type": "OrganizationAdmin",
    "Account Type": "Regular staff account",
    "What They Can Do": "Manage organization-level data: clubs, sports, positions, teams, staff, coaches, players, parent links, training, matches, evaluations, wellness, medical, rehab, videos and notifications inside their organization.",
    "Record Scope": "Records under the same organization.",
    "Main Responsibilities": "Organization setup, club administration, account provisioning, broad record management.",
    "Frontend Screens": "Organizations, Clubs, Sports, Positions, Teams, Staff, Coaches, Players, Training, Matches, Performance, Wellness, Medical, Video, Notifications.",
    "Restrictions / Security": "Should not manage records outside assigned organization.",
    "Frontend Implementation Notes": "Filter all lists by organization context; show organization switcher only if multiple orgs are allowed."
  },
  {
    "User Type": "ClubAdmin",
    "Account Type": "Regular staff account",
    "What They Can Do": "Manage club-level teams, staff, coaches, players, parent links, sessions, matches, evaluations, wellness, medical summaries, rehab coordination, videos and notifications.",
    "Record Scope": "Records under the same club and organization.",
    "Main Responsibilities": "Club operations, team setup, roster oversight, local account provisioning.",
    "Frontend Screens": "Clubs, Teams, Staff, Coaches, Players, Training, Matches, Performance, Wellness, Medical, Video, Notifications.",
    "Restrictions / Security": "Should not modify other clubs or organization-wide settings unless granted separately.",
    "Frontend Implementation Notes": "Use club-scoped navigation and default all create forms to the active club."
  },
  {
    "User Type": "TeamManager",
    "Account Type": "Regular staff account",
    "What They Can Do": "Manage assigned teams, rosters, players, training sessions, attendance, matches, match statistics, tasks, videos and team notifications.",
    "Record Scope": "Assigned team records and players on those teams.",
    "Main Responsibilities": "Roster management, scheduling, attendance control, match operations, player coordination.",
    "Frontend Screens": "Teams, Player Roster, Players, Training Sessions, Attendance, Training Tasks, Matches, Match Stats, Videos, Notifications.",
    "Restrictions / Security": "Medical details should be limited to availability/return information unless medical permission is granted.",
    "Frontend Implementation Notes": "Make team pages operational: roster tab, attendance generator, match stats grid, task assignment actions."
  },
  {
    "User Type": "Coach",
    "Account Type": "Regular coach account",
    "What They Can Do": "Manage training, attendance, player tasks, evaluations, match statistics, permitted videos, timeline tags and permitted injury availability for assigned teams.",
    "Record Scope": "Assigned teams, sessions created/assigned to them, players in those teams, own records.",
    "Main Responsibilities": "Daily coaching workflow, evaluation entry, training/match follow-up, video feedback.",
    "Frontend Screens": "Teams, Players, Training Sessions, Attendance, Training Tasks, Player Tasks, Matches, Match Stats, Evaluations, Videos, Comments, Timeline Tags.",
    "Restrictions / Security": "Confidential medical notes and organization admin setup should stay hidden.",
    "Frontend Implementation Notes": "Prioritize fast tables and inline editing for attendance, evaluations, tasks and match stats."
  },
  {
    "User Type": "FitnessCoach",
    "Account Type": "Regular coach account",
    "What They Can Do": "Manage fitness-related measurements, sport tests, player test results, wellness records and fitness tasks for assigned players/teams.",
    "Record Scope": "Assigned teams/players and own created fitness records.",
    "Main Responsibilities": "Fitness testing, body/measurement tracking, wellness follow-up, conditioning tasks.",
    "Frontend Screens": "Players, Measurements, Sport Test Definitions, Player Test Results, Wellness, Training Tasks, Player Tasks, Training Sessions.",
    "Restrictions / Security": "Should not access confidential medical diagnosis unless also medical staff.",
    "Frontend Implementation Notes": "Show fitness-first navigation; make measurement/test entry efficient for multiple players."
  },
  {
    "User Type": "Doctor",
    "Account Type": "Regular medical staff account",
    "What They Can Do": "Manage player injuries, diagnoses, severity/status, medical attachments, return dates, availability, rehabilitation plans and medical notifications.",
    "Record Scope": "Assigned organization/club/team medical records and injuries where doctor is responsible.",
    "Main Responsibilities": "Medical assessment, injury tracking, return-to-play decision support, attachment management.",
    "Frontend Screens": "Players, Injuries, Rehabilitation Plans, Rehabilitation Sessions, Wellness, Measurements read-only as useful, Notifications.",
    "Restrictions / Security": "Confidential notes and medical attachments must be protected from non-medical roles.",
    "Frontend Implementation Notes": "Use strong visual separation for confidential fields; show availability badges to coaches without exposing full notes."
  },
  {
    "User Type": "Physiotherapist",
    "Account Type": "Regular medical staff account",
    "What They Can Do": "Manage rehabilitation plans and sessions, recovery notes, exercises, progress, availability feedback and related injury recovery data.",
    "Record Scope": "Rehabilitation records assigned to them or linked to assigned teams/players.",
    "Main Responsibilities": "Rehab execution, session logging, recovery progress, player availability updates.",
    "Frontend Screens": "Players, Injuries read/limited edit, Rehabilitation Plans, Rehabilitation Sessions, Wellness, Notifications.",
    "Restrictions / Security": "Diagnosis/confidential doctor notes may be read-only or hidden depending on policy.",
    "Frontend Implementation Notes": "Build rehab plan timeline and session logging flow; keep injury context visible but permission-aware."
  },
  {
    "User Type": "Player",
    "Account Type": "Portal account",
    "What They Can Do": "View own profile, team, training sessions, attendance, tasks, evaluations if allowed, measurements, test results, wellness history, videos and notifications; submit own wellness records and update permitted task status.",
    "Record Scope": "Own player record and records linked through playerId/userId.",
    "Main Responsibilities": "Self-service profile, schedule awareness, wellness submission, task completion, video feedback review.",
    "Frontend Screens": "My Profile, My Training, My Attendance, My Tasks, My Wellness, My Measurements, My Test Results, My Evaluations, My Videos, Notifications.",
    "Restrictions / Security": "No access to other players. Evaluation/medical/video visibility should respect permissions.",
    "Frontend Implementation Notes": "Design a clean player portal; make wellness self-reporting mobile-first."
  },
  {
    "User Type": "Parent",
    "Account Type": "Portal account",
    "What They Can Do": "View linked child/player information only where ParentPlayerRelation flags allow: attendance, evaluations, videos, medical status and notifications.",
    "Record Scope": "Approved linked players only.",
    "Main Responsibilities": "Parent visibility, notification receipt, monitoring attendance/permitted progress.",
    "Frontend Screens": "Linked Players, Attendance, Evaluations if enabled, Videos if enabled, Medical Status if enabled, Notifications.",
    "Restrictions / Security": "Controlled by canViewAttendance, canViewEvaluations, canViewVideos, canViewMedicalStatus, canReceiveNotifications and approvalStatus.",
    "Frontend Implementation Notes": "Every parent screen must check relation flags before rendering tabs/actions."
  },
  {
    "User Type": "Scout",
    "Account Type": "Regular or scout portal account",
    "What They Can Do": "View scout-visible/public players and videos, create scouting notes/evaluations where permitted, comment/tag videos and review player profile information exposed for scouting.",
    "Record Scope": "Scout/public visibility records and assigned scouting records.",
    "Main Responsibilities": "Scouting review, player discovery, video review, scout evaluation capture.",
    "Frontend Screens": "Players with public/scout visibility, Videos, Player Video Links, Video Comments, Timeline Tags, Scout Evaluations.",
    "Restrictions / Security": "Private team, medical, wellness and internal notes should stay hidden unless explicitly shared.",
    "Frontend Implementation Notes": "Use visibility badges and avoid leaking private player/team information."
  },
  {
    "User Type": "DataAnalyst",
    "Account Type": "Regular staff account",
    "What They Can Do": "Access permitted raw records for data quality, exports and operational review. Dashboard and intelligence analysis features are excluded from this frontend scope.",
    "Record Scope": "Organization/team records granted by ACL, usually read-heavy.",
    "Main Responsibilities": "Data QA, record review, export preparation, correcting imported statistics if allowed.",
    "Frontend Screens": "Players, Teams, Training, Attendance, Matches, Match Stats, Measurements, Test Results, Evaluations, Videos as read/export-focused screens.",
    "Restrictions / Security": "Do not implement dashboards, trend charts or intelligence analysis in this requested scope.",
    "Frontend Implementation Notes": "Provide table-heavy views, filters and export affordances; keep analysis pages hidden."
  }
] as const;

export const USER_FEATURE_MATRIX = [
  {
    "User Type": "SuperAdmin",
    "Organizations/Setup": "Full",
    "Teams": "Full",
    "Players/Roster": "Full",
    "Training/Attendance": "Full",
    "Matches/Stats": "Full",
    "Performance/Wellness": "Full",
    "Medical/Rehab": "Full",
    "Video": "Full",
    "Tasks": "Full",
    "Notifications": "Full",
    "Account Provisioning": "Full",
    "Scope Notes": "All organizations; dashboard/analysis excluded from this workbook."
  },
  {
    "User Type": "OrganizationAdmin",
    "Organizations/Setup": "Manage org",
    "Teams": "Full in org",
    "Players/Roster": "Full in org",
    "Training/Attendance": "Full in org",
    "Matches/Stats": "Full in org",
    "Performance/Wellness": "Full in org",
    "Medical/Rehab": "Full in org",
    "Video": "Full in org",
    "Tasks": "Full in org",
    "Notifications": "Full in org",
    "Account Provisioning": "Manage in org",
    "Scope Notes": "Organization scope."
  },
  {
    "User Type": "ClubAdmin",
    "Organizations/Setup": "Manage club",
    "Teams": "Full in club",
    "Players/Roster": "Full in club",
    "Training/Attendance": "Full in club",
    "Matches/Stats": "Full in club",
    "Performance/Wellness": "Full in club",
    "Medical/Rehab": "Limited medical",
    "Video": "Full in club",
    "Tasks": "Full in club",
    "Notifications": "Full in club",
    "Account Provisioning": "Manage in club",
    "Scope Notes": "Club scope."
  },
  {
    "User Type": "TeamManager",
    "Organizations/Setup": "View assigned",
    "Teams": "Manage assigned team",
    "Players/Roster": "Manage roster",
    "Training/Attendance": "Manage sessions/attendance",
    "Matches/Stats": "Manage matches/stats",
    "Performance/Wellness": "View/coordinate",
    "Medical/Rehab": "Availability only",
    "Video": "Manage team videos",
    "Tasks": "Manage tasks",
    "Notifications": "Send team notices",
    "Account Provisioning": "Create team accounts if granted",
    "Scope Notes": "Assigned team scope."
  },
  {
    "User Type": "Coach",
    "Organizations/Setup": "View assigned",
    "Teams": "View assigned",
    "Players/Roster": "View players",
    "Training/Attendance": "Manage sessions/attendance",
    "Matches/Stats": "Manage matches/stats",
    "Performance/Wellness": "Create evaluations",
    "Medical/Rehab": "Availability only",
    "Video": "Manage/comment/tag",
    "Tasks": "Assign/update tasks",
    "Notifications": "Team notices",
    "Account Provisioning": "No/limited",
    "Scope Notes": "Assigned teams and own created records."
  },
  {
    "User Type": "FitnessCoach",
    "Organizations/Setup": "View assigned",
    "Teams": "View assigned",
    "Players/Roster": "View players",
    "Training/Attendance": "Fitness sessions/tasks",
    "Matches/Stats": "View relevant",
    "Performance/Wellness": "Measurements/tests/wellness",
    "Medical/Rehab": "No confidential",
    "Video": "View relevant",
    "Tasks": "Fitness tasks",
    "Notifications": "Relevant notices",
    "Account Provisioning": "No/limited",
    "Scope Notes": "Fitness-focused assigned player scope."
  },
  {
    "User Type": "Doctor",
    "Organizations/Setup": "View assigned",
    "Teams": "View assigned",
    "Players/Roster": "View players",
    "Training/Attendance": "View relevant",
    "Matches/Stats": "View relevant",
    "Performance/Wellness": "View relevant wellness/measurements",
    "Medical/Rehab": "Manage injuries/rehab",
    "Video": "View medical videos if shared",
    "Tasks": "Medical tasks",
    "Notifications": "Medical notices",
    "Account Provisioning": "No/limited",
    "Scope Notes": "Medical confidentiality applies."
  },
  {
    "User Type": "Physiotherapist",
    "Organizations/Setup": "View assigned",
    "Teams": "View assigned",
    "Players/Roster": "View players",
    "Training/Attendance": "View relevant",
    "Matches/Stats": "View relevant",
    "Performance/Wellness": "View relevant wellness",
    "Medical/Rehab": "Manage rehab sessions/plans",
    "Video": "View rehab videos if shared",
    "Tasks": "Rehab tasks",
    "Notifications": "Medical notices",
    "Account Provisioning": "No/limited",
    "Scope Notes": "Rehab-focused medical scope."
  },
  {
    "User Type": "Player",
    "Organizations/Setup": "Own profile",
    "Teams": "View own team",
    "Players/Roster": "Own only",
    "Training/Attendance": "View own sessions/attendance",
    "Matches/Stats": "View own matches/stats",
    "Performance/Wellness": "View allowed records, submit wellness",
    "Medical/Rehab": "View limited availability/rehab if allowed",
    "Video": "View/comment allowed videos",
    "Tasks": "Own tasks",
    "Notifications": "Own notifications",
    "Account Provisioning": "No",
    "Scope Notes": "Own records only."
  },
  {
    "User Type": "Parent",
    "Organizations/Setup": "Linked child only",
    "Teams": "View linked team basics",
    "Players/Roster": "Linked child only",
    "Training/Attendance": "Attendance if enabled",
    "Matches/Stats": "View if exposed",
    "Performance/Wellness": "Evaluations if enabled",
    "Medical/Rehab": "Medical status if enabled",
    "Video": "Videos if enabled",
    "Tasks": "View if exposed",
    "Notifications": "Receive if enabled",
    "Account Provisioning": "No",
    "Scope Notes": "Controlled by ParentPlayerRelation flags."
  },
  {
    "User Type": "Scout",
    "Organizations/Setup": "Scout-visible only",
    "Teams": "View public/scout teams if exposed",
    "Players/Roster": "Scout-visible players",
    "Training/Attendance": "No/limited",
    "Matches/Stats": "View public match context",
    "Performance/Wellness": "Scout evaluations if allowed",
    "Medical/Rehab": "No medical",
    "Video": "Scout/public videos",
    "Tasks": "Scout tasks/notes if enabled",
    "Notifications": "Scout notices",
    "Account Provisioning": "No",
    "Scope Notes": "Visibility field controls access."
  },
  {
    "User Type": "DataAnalyst",
    "Organizations/Setup": "Read/export",
    "Teams": "Read/export",
    "Players/Roster": "Read/export",
    "Training/Attendance": "Read/export",
    "Matches/Stats": "Read/export",
    "Performance/Wellness": "Read/export raw records",
    "Medical/Rehab": "No confidential by default",
    "Video": "Read/export",
    "Tasks": "No/limited",
    "Notifications": "No/limited",
    "Account Provisioning": "No",
    "Scope Notes": "Raw data only; no dashboard/analysis screens in this scope."
  }
] as const;
