// AUTO-GENERATED from player-performance-frontend-demo.xlsx (Entity Fields).
// Do not hand-edit field contracts; regenerate from the documentation workbook.
import { EntityDefinition } from '../entity-metadata.model';
export const ENTITY_METADATA: EntityDefinition[] = [
  {
    "name": "EvaluationCriteria",
    "label": "Evaluation Criteria",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "sport",
        "label": "Sport",
        "type": "link",
        "required": true,
        "linkedEntity": "Sport",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "category",
        "label": "Category",
        "type": "enum",
        "required": false,
        "options": [
          "Technical",
          "Physical",
          "Tactical",
          "Mental",
          "Behavioral",
          "Discipline",
          "Teamwork",
          "Leadership"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "minimumScore",
        "label": "Minimum Score",
        "type": "float",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "maximumScore",
        "label": "Maximum Score",
        "type": "float",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "weightPercentage",
        "label": "Weight Percentage",
        "type": "float",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "description",
        "label": "Description",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Inactive"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "MatchPlayerStatistic",
    "label": "Match Player Statistic",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "match",
        "label": "Match",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsMatch",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "team",
        "label": "Team",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsTeam",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "starter",
        "label": "Starter",
        "type": "bool",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "minutesPlayed",
        "label": "Minutes Played",
        "type": "int",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "rating",
        "label": "Rating",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "goals",
        "label": "Goals",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "assists",
        "label": "Assists",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "shots",
        "label": "Shots",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "passes",
        "label": "Passes",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "successfulPasses",
        "label": "Successful Passes",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "passSuccessPercentage",
        "label": "Pass Success Percentage",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "tackles",
        "label": "Tackles",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "saves",
        "label": "Saves",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "fouls",
        "label": "Fouls",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "yellowCards",
        "label": "Yellow Cards",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "redCards",
        "label": "Red Cards",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "distanceKm",
        "label": "Distance Km",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "maximumSpeedKph",
        "label": "Maximum Speed Kph",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "customStatistics",
        "label": "Custom Statistics",
        "type": "jsonObject",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "coachNotes",
        "label": "Coach Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "ParentPlayerRelation",
    "label": "Parent Player Relation",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "parentUser",
        "label": "Parent User",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "relationType",
        "label": "Relation Type",
        "type": "enum",
        "required": false,
        "options": [
          "Father",
          "Mother",
          "Guardian",
          "Other"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "canViewAttendance",
        "label": "Can View Attendance",
        "type": "bool",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "canViewEvaluations",
        "label": "Can View Evaluations",
        "type": "bool",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "canViewVideos",
        "label": "Can View Videos",
        "type": "bool",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "canViewMedicalStatus",
        "label": "Can View Medical Status",
        "type": "bool",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "canReceiveNotifications",
        "label": "Can Receive Notifications",
        "type": "bool",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "approvalStatus",
        "label": "Approval Status",
        "type": "enum",
        "required": false,
        "options": [
          "Pending",
          "Approved",
          "Rejected",
          "Revoked"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "PlayerEvaluation",
    "label": "Player Evaluation",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "team",
        "label": "Team",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsTeam",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "evaluator",
        "label": "Evaluator",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "evaluationDate",
        "label": "Evaluation Date",
        "type": "datetime",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "evaluationType",
        "label": "Evaluation Type",
        "type": "enum",
        "required": false,
        "options": [
          "Training",
          "Match",
          "Monthly",
          "Quarterly",
          "Trial",
          "Scout",
          "SelfEvaluation"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "technicalScore",
        "label": "Technical Score",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "physicalScore",
        "label": "Physical Score",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "tacticalScore",
        "label": "Tactical Score",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "mentalScore",
        "label": "Mental Score",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "behavioralScore",
        "label": "Behavioral Score",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "disciplineScore",
        "label": "Discipline Score",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "overallScore",
        "label": "Overall Score",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "strengths",
        "label": "Strengths",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "improvementAreas",
        "label": "Improvement Areas",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "recommendation",
        "label": "Recommendation",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Draft",
          "Submitted",
          "Reviewed",
          "Approved"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "attachment",
        "label": "Attachment",
        "type": "file",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "PlayerEvaluationItem",
    "label": "Player Evaluation Item",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "evaluation",
        "label": "Evaluation",
        "type": "link",
        "required": true,
        "linkedEntity": "PlayerEvaluation",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "criteria",
        "label": "Criteria",
        "type": "link",
        "required": true,
        "linkedEntity": "EvaluationCriteria",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "score",
        "label": "Score",
        "type": "float",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "comment",
        "label": "Comment",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": true,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": true,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "PlayerInjury",
    "label": "Player Injury",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "team",
        "label": "Team",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsTeam",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "injuryDate",
        "label": "Injury Date",
        "type": "date",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "injuryType",
        "label": "Injury Type",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "bodyArea",
        "label": "Body Area",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "side",
        "label": "Side",
        "type": "enum",
        "required": false,
        "options": [
          "Left",
          "Right",
          "Both",
          "NotApplicable"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "severity",
        "label": "Severity",
        "type": "enum",
        "required": false,
        "options": [
          "Minor",
          "Moderate",
          "Severe",
          "Critical"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "injuryStatus",
        "label": "Injury Status",
        "type": "enum",
        "required": false,
        "options": [
          "Reported",
          "UnderExamination",
          "Treatment",
          "Rehabilitation",
          "PartialTraining",
          "Ready",
          "Closed"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "diagnosis",
        "label": "Diagnosis",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "cause",
        "label": "Cause",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "doctor",
        "label": "Doctor",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "expectedReturnDate",
        "label": "Expected Return Date",
        "type": "date",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "actualReturnDate",
        "label": "Actual Return Date",
        "type": "date",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "trainingAvailability",
        "label": "Training Availability",
        "type": "enum",
        "required": false,
        "options": [
          "Unavailable",
          "Partial",
          "Full"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "confidentialNotes",
        "label": "Confidential Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "medicalAttachment",
        "label": "Medical Attachment",
        "type": "file",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "PlayerMeasurement",
    "label": "Player Measurement",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "measurementDate",
        "label": "Measurement Date",
        "type": "datetime",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "heightCm",
        "label": "Height Cm",
        "type": "float",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "weightKg",
        "label": "Weight Kg",
        "type": "float",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "bodyFatPercentage",
        "label": "Body Fat Percentage",
        "type": "float",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "muscleMassKg",
        "label": "Muscle Mass Kg",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "bmi",
        "label": "Bmi",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "restingHeartRate",
        "label": "Resting Heart Rate",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "maximumHeartRate",
        "label": "Maximum Heart Rate",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "bloodPressureSystolic",
        "label": "Blood Pressure Systolic",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "bloodPressureDiastolic",
        "label": "Blood Pressure Diastolic",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "maximumSpeedKph",
        "label": "Maximum Speed Kph",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "verticalJumpCm",
        "label": "Vertical Jump Cm",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "flexibilityScore",
        "label": "Flexibility Score",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "strengthScore",
        "label": "Strength Score",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "enduranceScore",
        "label": "Endurance Score",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "source",
        "label": "Source",
        "type": "enum",
        "required": false,
        "options": [
          "Manual",
          "Device",
          "Imported",
          "API"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "deviceReference",
        "label": "Device Reference",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "PlayerTask",
    "label": "Player Task",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "task",
        "label": "Task",
        "type": "link",
        "required": true,
        "linkedEntity": "TrainingTask",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "playerStatus",
        "label": "Player Status",
        "type": "enum",
        "required": false,
        "options": [
          "Pending",
          "InProgress",
          "Completed",
          "Missed",
          "Reviewed"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "completionDate",
        "label": "Completion Date",
        "type": "datetime",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "resultValue",
        "label": "Result Value",
        "type": "float",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "playerComment",
        "label": "Player Comment",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "coachComment",
        "label": "Coach Comment",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "evidenceAttachment",
        "label": "Evidence Attachment",
        "type": "file",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "evidenceVideo",
        "label": "Evidence Video",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsVideo",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "PlayerTestResult",
    "label": "Player Test Result",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "testDefinition",
        "label": "Test Definition",
        "type": "link",
        "required": true,
        "linkedEntity": "SportTestDefinition",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "testDate",
        "label": "Test Date",
        "type": "datetime",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "numericValue",
        "label": "Numeric Value",
        "type": "float",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "textValue",
        "label": "Text Value",
        "type": "text",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "score",
        "label": "Score",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "resultStatus",
        "label": "Result Status",
        "type": "enum",
        "required": false,
        "options": [
          "Excellent",
          "Good",
          "Average",
          "BelowAverage",
          "NeedsImprovement"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "evaluator",
        "label": "Evaluator",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "attachment",
        "label": "Attachment",
        "type": "file",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "PlayerVideoLink",
    "label": "Player Video Link",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "video",
        "label": "Video",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsVideo",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "roleInVideo",
        "label": "Role In Video",
        "type": "enum",
        "required": false,
        "options": [
          "Primary",
          "Secondary",
          "Opponent"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "startSecond",
        "label": "Start Second",
        "type": "int",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "endSecond",
        "label": "End Second",
        "type": "int",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "PlayerWellness",
    "label": "Player Wellness",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "recordDate",
        "label": "Record Date",
        "type": "date",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "sleepHours",
        "label": "Sleep Hours",
        "type": "float",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "sleepQuality",
        "label": "Sleep Quality",
        "type": "int",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "fatigueLevel",
        "label": "Fatigue Level",
        "type": "int",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "musclePainLevel",
        "label": "Muscle Pain Level",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "stressLevel",
        "label": "Stress Level",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "moodLevel",
        "label": "Mood Level",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "readinessLevel",
        "label": "Readiness Level",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "hasPain",
        "label": "Has Pain",
        "type": "bool",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "painLocation",
        "label": "Pain Location",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "wellnessStatus",
        "label": "Wellness Status",
        "type": "enum",
        "required": false,
        "options": [
          "Ready",
          "Monitor",
          "HighFatigue",
          "MedicalReview",
          "RestRecommended"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "RehabilitationPlan",
    "label": "Rehabilitation Plan",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "injury",
        "label": "Injury",
        "type": "link",
        "required": true,
        "linkedEntity": "PlayerInjury",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "responsibleStaff",
        "label": "Responsible Staff",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "startDate",
        "label": "Start Date",
        "type": "date",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "expectedEndDate",
        "label": "Expected End Date",
        "type": "date",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "actualEndDate",
        "label": "Actual End Date",
        "type": "date",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Planned",
          "Active",
          "Paused",
          "Completed",
          "Cancelled"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "objectives",
        "label": "Objectives",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "instructions",
        "label": "Instructions",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "progressPercentage",
        "label": "Progress Percentage",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "RehabilitationSession",
    "label": "Rehabilitation Session",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "rehabilitationPlan",
        "label": "Rehabilitation Plan",
        "type": "link",
        "required": true,
        "linkedEntity": "RehabilitationPlan",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "sessionDate",
        "label": "Session Date",
        "type": "datetime",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "durationMinutes",
        "label": "Duration Minutes",
        "type": "int",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "painBefore",
        "label": "Pain Before",
        "type": "int",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "painAfter",
        "label": "Pain After",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "exercises",
        "label": "Exercises",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "result",
        "label": "Result",
        "type": "enum",
        "required": false,
        "options": [
          "Improved",
          "Stable",
          "Worse",
          "Completed"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "staffNotes",
        "label": "Staff Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "attachment",
        "label": "Attachment",
        "type": "file",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "Sport",
    "label": "Sport",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "code",
        "label": "Code",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "category",
        "label": "Category",
        "type": "enum",
        "required": false,
        "options": [
          "TeamSport",
          "IndividualSport"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Inactive"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "icon",
        "label": "Icon",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "description",
        "label": "Description",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": true,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportPosition",
    "label": "Sport Position",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "code",
        "label": "Code",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "sport",
        "label": "Sport",
        "type": "link",
        "required": true,
        "linkedEntity": "Sport",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "description",
        "label": "Description",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Inactive"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": true,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": true,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportTestDefinition",
    "label": "Sport Test Definition",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "sport",
        "label": "Sport",
        "type": "link",
        "required": true,
        "linkedEntity": "Sport",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "category",
        "label": "Category",
        "type": "enum",
        "required": false,
        "options": [
          "Speed",
          "Strength",
          "Endurance",
          "Agility",
          "Flexibility",
          "Technical",
          "Tactical",
          "Mental",
          "Custom"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "unit",
        "label": "Unit",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "valueType",
        "label": "Value Type",
        "type": "enum",
        "required": false,
        "options": [
          "Number",
          "Time",
          "Percentage",
          "Score",
          "Text",
          "Boolean"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "minimumValue",
        "label": "Minimum Value",
        "type": "float",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "maximumValue",
        "label": "Maximum Value",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "higherIsBetter",
        "label": "Higher Is Better",
        "type": "bool",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "instructions",
        "label": "Instructions",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Inactive"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportsClub",
    "label": "Sports Club",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "code",
        "label": "Code",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "logo",
        "label": "Logo",
        "type": "image",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "clubType",
        "label": "Club Type",
        "type": "enum",
        "required": false,
        "options": [
          "ProfessionalClub",
          "Academy",
          "School",
          "TrainingCenter"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "emailAddress",
        "label": "Email Address",
        "type": "email",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "phoneNumber",
        "label": "Phone Number",
        "type": "phone",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "website",
        "label": "Website",
        "type": "url",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "addressStreet",
        "label": "Address Street",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "addressCity",
        "label": "Address City",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "addressState",
        "label": "Address State",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "addressCountry",
        "label": "Address Country",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "establishedDate",
        "label": "Established Date",
        "type": "date",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Inactive",
          "Archived"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "assignedUser",
        "label": "Assigned User",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportsCoach",
    "label": "Sports Coach",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "club",
        "label": "Club",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsClub",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "teams",
        "label": "Teams",
        "type": "linkMultiple",
        "required": false,
        "linkedEntity": "SportsTeam",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "assistantTeams",
        "label": "Assistant Teams",
        "type": "linkMultiple",
        "required": false,
        "linkedEntity": "SportsTeam",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "coachType",
        "label": "Coach Type",
        "type": "enum",
        "required": false,
        "options": [
          "HeadCoach",
          "AssistantCoach",
          "GoalkeeperCoach",
          "FitnessCoach",
          "TechnicalCoach",
          "Analyst"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "specialization",
        "label": "Specialization",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "licenseNumber",
        "label": "License Number",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "licenseLevel",
        "label": "License Level",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "experienceYears",
        "label": "Experience Years",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "profilePhoto",
        "label": "Profile Photo",
        "type": "image",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Inactive",
          "Archived"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "assignedUser",
        "label": "Assigned User",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportsMatch",
    "label": "Sports Match",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "team",
        "label": "Team",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsTeam",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "opponentName",
        "label": "Opponent Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "competitionName",
        "label": "Competition Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "season",
        "label": "Season",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "matchDateTime",
        "label": "Match Date Time",
        "type": "datetime",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "location",
        "label": "Location",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "venueType",
        "label": "Venue Type",
        "type": "enum",
        "required": false,
        "options": [
          "Home",
          "Away",
          "Neutral"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "matchStatus",
        "label": "Match Status",
        "type": "enum",
        "required": false,
        "options": [
          "Scheduled",
          "InProgress",
          "Completed",
          "Cancelled",
          "Postponed"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "teamScore",
        "label": "Team Score",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "opponentScore",
        "label": "Opponent Score",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "result",
        "label": "Result",
        "type": "enum",
        "required": false,
        "options": [
          "Win",
          "Draw",
          "Loss",
          "NotAvailable"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "matchVideo",
        "label": "Match Video",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsVideo",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportsNotification",
    "label": "Sports Notification",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "recipientUser",
        "label": "Recipient User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notificationType",
        "label": "Notification Type",
        "type": "enum",
        "required": false,
        "options": [
          "Training",
          "Task",
          "Evaluation",
          "VideoComment",
          "Injury",
          "WellnessAlert",
          "Match",
          "Subscription",
          "System"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "title",
        "label": "Title",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "message",
        "label": "Message",
        "type": "text",
        "required": true,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "relatedEntityType",
        "label": "Related Entity Type",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "relatedEntityId",
        "label": "Related Entity Id",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "readStatus",
        "label": "Read Status",
        "type": "enum",
        "required": false,
        "options": [
          "Unread",
          "Read"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "deliveryChannel",
        "label": "Delivery Channel",
        "type": "enum",
        "required": false,
        "options": [
          "InApp",
          "Email",
          "Push",
          "SMS"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "deliveryStatus",
        "label": "Delivery Status",
        "type": "enum",
        "required": false,
        "options": [
          "Pending",
          "Sent",
          "Failed"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "sentDate",
        "label": "Sent Date",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "readDate",
        "label": "Read Date",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportsOrganization",
    "label": "Sports Organization",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "code",
        "label": "Code",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organizationType",
        "label": "Organization Type",
        "type": "enum",
        "required": false,
        "options": [
          "Club",
          "Academy",
          "Federation",
          "TrainingCenter",
          "IndependentTeam"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "logo",
        "label": "Logo",
        "type": "image",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "emailAddress",
        "label": "Email Address",
        "type": "email",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "phoneNumber",
        "label": "Phone Number",
        "type": "phone",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "website",
        "label": "Website",
        "type": "url",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "addressStreet",
        "label": "Address Street",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "addressCity",
        "label": "Address City",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "addressState",
        "label": "Address State",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "addressCountry",
        "label": "Address Country",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Suspended",
          "Archived"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "subscriptionPlan",
        "label": "Subscription Plan",
        "type": "enum",
        "required": false,
        "options": [
          "Trial",
          "Basic",
          "Professional",
          "Enterprise"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "subscriptionStartDate",
        "label": "Subscription Start Date",
        "type": "date",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "subscriptionEndDate",
        "label": "Subscription End Date",
        "type": "date",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "maximumPlayers",
        "label": "Maximum Players",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "maximumTeams",
        "label": "Maximum Teams",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "maximumStorageGb",
        "label": "Maximum Storage Gb",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "assignedUser",
        "label": "Assigned User",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "teams",
        "label": "Teams",
        "type": "linkMultiple",
        "required": false,
        "linkedEntity": "Team",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportsPlayer",
    "label": "Sports Player",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "firstName",
        "label": "First Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "lastName",
        "label": "Last Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "emailAddress",
        "label": "Login Email",
        "type": "email",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "loginPassword",
        "label": "Login Password",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": false,
        "edit": true,
        "filter": false,
        "notes": "Virtual/not stored"
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "club",
        "label": "Club",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsClub",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "sport",
        "label": "Sport",
        "type": "link",
        "required": false,
        "linkedEntity": "Sport",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "primaryPosition",
        "label": "Primary Position",
        "type": "link",
        "required": false,
        "linkedEntity": "SportPosition",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "secondaryPositions",
        "label": "Secondary Positions",
        "type": "linkMultiple",
        "required": false,
        "linkedEntity": "SportPosition",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "playerNumber",
        "label": "Player Number",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "registrationNumber",
        "label": "Registration Number",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "birthDate",
        "label": "Birth Date",
        "type": "date",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "nationality",
        "label": "Nationality",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "gender",
        "label": "Gender",
        "type": "enum",
        "required": false,
        "options": [
          "Male",
          "Female"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "heightCm",
        "label": "Height Cm",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "weightKg",
        "label": "Weight Kg",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "preferredSide",
        "label": "Preferred Side",
        "type": "enum",
        "required": false,
        "options": [
          "Right",
          "Left",
          "Both",
          "NotApplicable"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "profilePhoto",
        "label": "Profile Photo",
        "type": "image",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "joinDate",
        "label": "Join Date",
        "type": "date",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "contractStartDate",
        "label": "Contract Start Date",
        "type": "date",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "contractEndDate",
        "label": "Contract End Date",
        "type": "date",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "experienceYears",
        "label": "Experience Years",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "medicalStatus",
        "label": "Medical Status",
        "type": "enum",
        "required": false,
        "options": [
          "Available",
          "PartialTraining",
          "Injured",
          "Unavailable",
          "AwaitingMedicalApproval"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "playerStatus",
        "label": "Player Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Trial",
          "Suspended",
          "Released",
          "Retired",
          "Archived"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "publicProfileEnabled",
        "label": "Public Profile Enabled",
        "type": "bool",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "publicProfileSlug",
        "label": "Public Profile Slug",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "biography",
        "label": "Biography",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "strengths",
        "label": "Strengths",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "improvementAreas",
        "label": "Improvement Areas",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "assignedUser",
        "label": "Assigned User",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportsPlayerTeam",
    "label": "Sports Player Team",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "team",
        "label": "Team",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsTeam",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "startDate",
        "label": "Start Date",
        "type": "date",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "endDate",
        "label": "End Date",
        "type": "date",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Inactive",
          "Loan",
          "Trial"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "shirtNumber",
        "label": "Shirt Number",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "position",
        "label": "Position",
        "type": "link",
        "required": false,
        "linkedEntity": "SportPosition",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "isCaptain",
        "label": "Is Captain",
        "type": "bool",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportsStaff",
    "label": "Sports Staff",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "club",
        "label": "Club",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsClub",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "teams",
        "label": "Teams",
        "type": "linkMultiple",
        "required": false,
        "linkedEntity": "SportsTeam",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "staffType",
        "label": "Staff Type",
        "type": "enum",
        "required": false,
        "options": [
          "Doctor",
          "Physiotherapist",
          "Nutritionist",
          "TeamManager",
          "Scout",
          "DataAnalyst",
          "Administrator"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "licenseNumber",
        "label": "License Number",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "specialization",
        "label": "Specialization",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Inactive"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "assignedUser",
        "label": "Assigned User",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportsTeam",
    "label": "Sports Team",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "code",
        "label": "Code",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "club",
        "label": "Club",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsClub",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "sport",
        "label": "Sport",
        "type": "link",
        "required": true,
        "linkedEntity": "Sport",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "ageGroup",
        "label": "Age Group",
        "type": "enum",
        "required": false,
        "options": [
          "U8",
          "U10",
          "U12",
          "U14",
          "U16",
          "U18",
          "U21",
          "Senior",
          "Custom"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "customAgeGroup",
        "label": "Custom Age Group",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "gender",
        "label": "Gender",
        "type": "enum",
        "required": false,
        "options": [
          "Male",
          "Female",
          "Mixed"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "season",
        "label": "Season",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "level",
        "label": "Level",
        "type": "enum",
        "required": false,
        "options": [
          "Beginner",
          "Intermediate",
          "Advanced",
          "Professional"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Inactive",
          "Archived"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "trainingLocation",
        "label": "Training Location",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "description",
        "label": "Description",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "headCoach",
        "label": "Head Coach",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "assistantCoaches",
        "label": "Assistant Coaches",
        "type": "linkMultiple",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "sportsUsers",
        "label": "Sports Users",
        "type": "linkMultiple",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": false,
        "edit": false,
        "filter": false
      },
      {
        "key": "assignedUser",
        "label": "Assigned User",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportsUserProfile",
    "label": "Sports User Profile",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "club",
        "label": "Club",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsClub",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "profileType",
        "label": "Profile Type",
        "type": "enum",
        "required": false,
        "options": [
          "SuperAdmin",
          "OrganizationAdmin",
          "ClubAdmin",
          "TeamManager",
          "Coach",
          "FitnessCoach",
          "Doctor",
          "Physiotherapist",
          "Player",
          "Parent",
          "Scout"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "accountType",
        "label": "Account Type",
        "type": "enum",
        "required": false,
        "options": [
          "Regular",
          "Portal"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "accountStatus",
        "label": "Account Status",
        "type": "enum",
        "required": false,
        "options": [
          "Pending",
          "Active",
          "Suspended",
          "Disabled"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "status",
        "label": "Profile Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Suspended",
          "Archived"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "lastInvitationDate",
        "label": "Last Invitation Date",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "passwordChangeRequired",
        "label": "Require Password Change",
        "type": "bool",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "linkedEntityType",
        "label": "Linked Entity Type",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "linkedEntityId",
        "label": "Linked Entity ID",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "profilePhoto",
        "label": "Profile Photo",
        "type": "image",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "coach",
        "label": "Coach",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "staff",
        "label": "Staff",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsStaff",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "SportsVideo",
    "label": "Sports Video",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "uploader",
        "label": "Uploader",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "sport",
        "label": "Sport",
        "type": "link",
        "required": false,
        "linkedEntity": "Sport",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "team",
        "label": "Team",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsTeam",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "match",
        "label": "Match",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsMatch",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "trainingSession",
        "label": "Training Session",
        "type": "link",
        "required": false,
        "linkedEntity": "TrainingSession",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "videoType",
        "label": "Video Type",
        "type": "enum",
        "required": false,
        "options": [
          "FullMatch",
          "Training",
          "PhysicalTest",
          "Skill",
          "Highlight",
          "TechnicalAnalysis",
          "Rehabilitation",
          "ScoutVideo",
          "Other"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "videoFile",
        "label": "Video File",
        "type": "file",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "externalStorageProvider",
        "label": "External Storage Provider",
        "type": "enum",
        "required": false,
        "options": [
          "EspoAttachment",
          "MinIO",
          "AmazonS3",
          "AzureBlob",
          "ExternalUrl"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "externalStorageKey",
        "label": "External Storage Key",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "externalUrl",
        "label": "External Url",
        "type": "url",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "thumbnail",
        "label": "Thumbnail",
        "type": "image",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "durationSeconds",
        "label": "Duration Seconds",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "fileSizeBytes",
        "label": "File Size Bytes",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "processingStatus",
        "label": "Processing Status",
        "type": "enum",
        "required": false,
        "options": [
          "Uploaded",
          "Processing",
          "Ready",
          "Failed"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "visibility",
        "label": "Visibility",
        "type": "enum",
        "required": false,
        "options": [
          "Private",
          "PlayerAndCoach",
          "Team",
          "Club",
          "Scout",
          "Public"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "description",
        "label": "Description",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "recordedDate",
        "label": "Recorded Date",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "opponentName",
        "label": "Opponent Name",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "competitionName",
        "label": "Competition Name",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Archived",
          "Deleted"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "TrainingAttendance",
    "label": "Training Attendance",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "trainingSession",
        "label": "Training Session",
        "type": "link",
        "required": true,
        "linkedEntity": "TrainingSession",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "attendanceStatus",
        "label": "Attendance Status",
        "type": "enum",
        "required": false,
        "options": [
          "Present",
          "Absent",
          "Late",
          "Excused",
          "Injured",
          "Partial"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "checkInTime",
        "label": "Check In Time",
        "type": "datetime",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "checkOutTime",
        "label": "Check Out Time",
        "type": "datetime",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "participationMinutes",
        "label": "Participation Minutes",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "playerLoad",
        "label": "Player Load",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "coachRating",
        "label": "Coach Rating",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "TrainingSession",
    "label": "Training Session",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "club",
        "label": "Club",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsClub",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "team",
        "label": "Team",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsTeam",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "coach",
        "label": "Coach",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "startDateTime",
        "label": "Start Date Time",
        "type": "datetime",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "endDateTime",
        "label": "End Date Time",
        "type": "datetime",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "location",
        "label": "Location",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "sessionType",
        "label": "Session Type",
        "type": "enum",
        "required": false,
        "options": [
          "Technical",
          "Tactical",
          "Fitness",
          "Recovery",
          "MatchPreparation",
          "Rehabilitation",
          "Individual",
          "Other"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "intensity",
        "label": "Intensity",
        "type": "enum",
        "required": false,
        "options": [
          "Low",
          "Medium",
          "High",
          "VeryHigh"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "objectives",
        "label": "Objectives",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "description",
        "label": "Description",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Planned",
          "InProgress",
          "Completed",
          "Cancelled"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "notes",
        "label": "Notes",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "TrainingTask",
    "label": "Training Task",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "coach",
        "label": "Coach",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "team",
        "label": "Team",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsTeam",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "assignedPlayers",
        "label": "Assigned Players",
        "type": "linkMultiple",
        "required": false,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "startDate",
        "label": "Start Date",
        "type": "date",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "dueDate",
        "label": "Due Date",
        "type": "date",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "taskType",
        "label": "Task Type",
        "type": "enum",
        "required": false,
        "options": [
          "Exercise",
          "Video",
          "Fitness",
          "Test",
          "Recovery",
          "Nutrition",
          "Homework"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "description",
        "label": "Description",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "instructions",
        "label": "Instructions",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "repetitions",
        "label": "Repetitions",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "durationMinutes",
        "label": "Duration Minutes",
        "type": "int",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "difficulty",
        "label": "Difficulty",
        "type": "enum",
        "required": false,
        "options": [
          "Easy",
          "Medium",
          "Hard"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "referenceVideo",
        "label": "Reference Video",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsVideo",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Draft",
          "Published",
          "Closed",
          "Cancelled"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "User",
    "label": "User",
    "fields": [
      {
        "key": "userTypes",
        "label": "User Type",
        "type": "enum",
        "required": false,
        "options": [
          "Player",
          "Coach",
          "Doctor",
          "Parent",
          "Scout",
          "TeamManager",
          "FitnessCoach",
          "Physiotherapist",
          "ClubAdmin",
          "OrganizationAdmin",
          "SuperAdmin",
          "DataAnalyst",
          "Nutritionist"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "birthDate",
        "label": "Birth Date",
        "type": "date",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "nationality",
        "label": "Nationality",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "club",
        "label": "Club",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsClub",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "sportsStatus",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Pending",
          "Active",
          "Suspended",
          "Disabled"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "profilePhoto",
        "label": "Profile Photo",
        "type": "image",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "sport",
        "label": "Sport",
        "type": "link",
        "required": false,
        "linkedEntity": "Sport",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "primaryPosition",
        "label": "Position",
        "type": "link",
        "required": false,
        "linkedEntity": "SportPosition",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "preferredFoot",
        "label": "Preferred Foot",
        "type": "enum",
        "required": false,
        "options": [
          "Right",
          "Left",
          "Both",
          "NotApplicable"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "heightCm",
        "label": "Height",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "weightKg",
        "label": "Weight",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "playerNumber",
        "label": "Player Number",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "publicProfileEnabled",
        "label": "Public Profile",
        "type": "bool",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "coachType",
        "label": "Coach Type",
        "type": "enum",
        "required": false,
        "options": [
          "HeadCoach",
          "AssistantCoach",
          "GoalkeeperCoach",
          "FitnessCoach",
          "TechnicalCoach",
          "Analyst"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "licenseNumber",
        "label": "License Number",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "licenseLevel",
        "label": "License Level",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "experienceYears",
        "label": "Experience Years",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "assignedSportsTeams",
        "label": "Assigned Teams",
        "type": "linkMultiple",
        "required": false,
        "linkedEntity": "SportsTeam",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "specialization",
        "label": "Specialization",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "scoutInformation",
        "label": "Scout Information",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "fitnessInformation",
        "label": "Fitness Information",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "linkedPlayers",
        "label": "Linked Players",
        "type": "linkMultiple",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "gmpGspGdpTrainingStatus",
        "label": "Gmp Gsp Gdp Training Status",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": false,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "VideoClip",
    "label": "Video Clip",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "sourceVideo",
        "label": "Source Video",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsVideo",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "startSecond",
        "label": "Start Second",
        "type": "int",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "endSecond",
        "label": "End Second",
        "type": "int",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "clipType",
        "label": "Clip Type",
        "type": "enum",
        "required": false,
        "options": [
          "Highlight",
          "Goal",
          "Skill",
          "Error",
          "Tactical",
          "Training",
          "Scout"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "generatedFile",
        "label": "Generated File",
        "type": "file",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "processingStatus",
        "label": "Processing Status",
        "type": "enum",
        "required": false,
        "options": [
          "Pending",
          "Processing",
          "Ready",
          "Failed"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "description",
        "label": "Description",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "VideoComment",
    "label": "Video Comment",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "video",
        "label": "Video",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsVideo",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "timeSecond",
        "label": "Time Second",
        "type": "int",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "commentType",
        "label": "Comment Type",
        "type": "enum",
        "required": false,
        "options": [
          "General",
          "Positive",
          "Improvement",
          "Tactical",
          "Technical",
          "Physical",
          "Mistake"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "comment",
        "label": "Comment",
        "type": "text",
        "required": true,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "visibility",
        "label": "Visibility",
        "type": "enum",
        "required": false,
        "options": [
          "Private",
          "Player",
          "Team",
          "Club"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "status",
        "label": "Status",
        "type": "enum",
        "required": false,
        "options": [
          "Active",
          "Resolved",
          "Deleted"
        ],
        "list": false,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  },
  {
    "name": "VideoTimelineTag",
    "label": "Video Timeline Tag",
    "fields": [
      {
        "key": "name",
        "label": "Name",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "user",
        "label": "User",
        "type": "link",
        "required": true,
        "linkedEntity": "User",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "video",
        "label": "Video",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsVideo",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "player",
        "label": "Player",
        "type": "link",
        "required": false,
        "linkedEntity": "SportsPlayer",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "organization",
        "label": "Organization",
        "type": "link",
        "required": true,
        "linkedEntity": "SportsOrganization",
        "list": true,
        "detail": true,
        "edit": true,
        "filter": true
      },
      {
        "key": "timeSecond",
        "label": "Time Second",
        "type": "int",
        "required": true,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "tagType",
        "label": "Tag Type",
        "type": "enum",
        "required": false,
        "options": [
          "Goal",
          "Assist",
          "Pass",
          "Shot",
          "Save",
          "Mistake",
          "Tackle",
          "Sprint",
          "Skill",
          "Tactical",
          "Physical",
          "Custom"
        ],
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "customTag",
        "label": "Custom Tag",
        "type": "varchar",
        "required": false,
        "list": true,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "title",
        "label": "Title",
        "type": "varchar",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "description",
        "label": "Description",
        "type": "text",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "rating",
        "label": "Rating",
        "type": "float",
        "required": false,
        "list": false,
        "detail": true,
        "edit": true,
        "filter": false
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "modifiedAt",
        "label": "Modified At",
        "type": "datetime",
        "required": false,
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false,
        "notes": "Read only"
      },
      {
        "key": "createdBy",
        "label": "Created By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      },
      {
        "key": "modifiedBy",
        "label": "Modified By",
        "type": "link",
        "required": false,
        "linkedEntity": "User",
        "list": false,
        "detail": true,
        "edit": false,
        "filter": false
      }
    ]
  }
];
export const ENTITY_DEFINITIONS = Object.fromEntries(ENTITY_METADATA.map(entity => [entity.name, entity])) as Record<string, EntityDefinition>;
