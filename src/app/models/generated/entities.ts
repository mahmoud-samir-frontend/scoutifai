// AUTO-GENERATED from player-performance-frontend-demo.xlsx (Entity Fields).
export interface DocumentedEntity { id: string; createdAt?: string; modifiedAt?: string; [key: string]: unknown; }

export interface EvaluationCriteriaEntity extends DocumentedEntity {
  "name": string;
  "sport": string;
  "organization": string;
  "category"?: string;
  "minimumScore"?: number;
  "maximumScore"?: number;
  "weightPercentage"?: number;
  "description"?: string;
  "status"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface MatchPlayerStatisticEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "match": string;
  "player"?: string;
  "organization"?: string;
  "team": string;
  "starter"?: boolean;
  "minutesPlayed"?: number;
  "rating"?: number;
  "goals"?: number;
  "assists"?: number;
  "shots"?: number;
  "passes"?: number;
  "successfulPasses"?: number;
  "passSuccessPercentage"?: number;
  "tackles"?: number;
  "saves"?: number;
  "fouls"?: number;
  "yellowCards"?: number;
  "redCards"?: number;
  "distanceKm"?: number;
  "maximumSpeedKph"?: number;
  "customStatistics"?: Record<string, unknown>;
  "coachNotes"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface ParentPlayerRelationEntity extends DocumentedEntity {
  "name"?: string;
  "parentUser": string;
  "player": string;
  "organization": string;
  "relationType"?: string;
  "canViewAttendance"?: boolean;
  "canViewEvaluations"?: boolean;
  "canViewVideos"?: boolean;
  "canViewMedicalStatus"?: boolean;
  "canReceiveNotifications"?: boolean;
  "approvalStatus"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface PlayerEvaluationEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "player"?: string;
  "organization": string;
  "team"?: string;
  "evaluator": string;
  "evaluationDate": string;
  "evaluationType"?: string;
  "technicalScore"?: number;
  "physicalScore"?: number;
  "tacticalScore"?: number;
  "mentalScore"?: number;
  "behavioralScore"?: number;
  "disciplineScore"?: number;
  "overallScore"?: number;
  "strengths"?: string;
  "improvementAreas"?: string;
  "recommendation"?: string;
  "status"?: string;
  "attachment"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface PlayerEvaluationItemEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "evaluation": string;
  "criteria": string;
  "score"?: number;
  "comment"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface PlayerInjuryEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "player"?: string;
  "organization": string;
  "team"?: string;
  "injuryDate": string;
  "injuryType": string;
  "bodyArea"?: string;
  "side"?: string;
  "severity"?: string;
  "injuryStatus"?: string;
  "diagnosis"?: string;
  "cause"?: string;
  "doctor"?: string;
  "expectedReturnDate"?: string;
  "actualReturnDate"?: string;
  "trainingAvailability"?: string;
  "confidentialNotes"?: string;
  "medicalAttachment"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface PlayerMeasurementEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "player"?: string;
  "organization": string;
  "measurementDate": string;
  "heightCm"?: number;
  "weightKg"?: number;
  "bodyFatPercentage"?: number;
  "muscleMassKg"?: number;
  "bmi"?: number;
  "restingHeartRate"?: number;
  "maximumHeartRate"?: number;
  "bloodPressureSystolic"?: number;
  "bloodPressureDiastolic"?: number;
  "maximumSpeedKph"?: number;
  "verticalJumpCm"?: number;
  "flexibilityScore"?: number;
  "strengthScore"?: number;
  "enduranceScore"?: number;
  "source"?: string;
  "deviceReference"?: string;
  "notes"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface PlayerTaskEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "task": string;
  "player"?: string;
  "organization": string;
  "playerStatus"?: string;
  "completionDate"?: string;
  "resultValue"?: number;
  "playerComment"?: string;
  "coachComment"?: string;
  "evidenceAttachment"?: string;
  "evidenceVideo"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface PlayerTestResultEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "player"?: string;
  "testDefinition": string;
  "organization": string;
  "testDate": string;
  "numericValue"?: number;
  "textValue"?: string;
  "score"?: number;
  "resultStatus"?: string;
  "evaluator"?: string;
  "attachment"?: string;
  "notes"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface PlayerVideoLinkEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "video": string;
  "player"?: string;
  "organization": string;
  "roleInVideo"?: string;
  "startSecond"?: number;
  "endSecond"?: number;
  "notes"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface PlayerWellnessEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "player"?: string;
  "organization": string;
  "recordDate": string;
  "sleepHours"?: number;
  "sleepQuality"?: number;
  "fatigueLevel"?: number;
  "musclePainLevel"?: number;
  "stressLevel"?: number;
  "moodLevel"?: number;
  "readinessLevel"?: number;
  "hasPain"?: boolean;
  "painLocation"?: string;
  "notes"?: string;
  "wellnessStatus"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface RehabilitationPlanEntity extends DocumentedEntity {
  "name": string;
  "user": string;
  "injury": string;
  "player"?: string;
  "organization": string;
  "responsibleStaff"?: string;
  "startDate"?: string;
  "expectedEndDate"?: string;
  "actualEndDate"?: string;
  "status"?: string;
  "objectives"?: string;
  "instructions"?: string;
  "progressPercentage"?: number;
  "notes"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface RehabilitationSessionEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "rehabilitationPlan": string;
  "player"?: string;
  "organization": string;
  "sessionDate": string;
  "durationMinutes"?: number;
  "painBefore"?: number;
  "painAfter"?: number;
  "exercises"?: string;
  "result"?: string;
  "staffNotes"?: string;
  "attachment"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportEntity extends DocumentedEntity {
  "name": string;
  "code": string;
  "organization"?: string;
  "category"?: string;
  "status"?: string;
  "icon"?: string;
  "description"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportPositionEntity extends DocumentedEntity {
  "name": string;
  "code"?: string;
  "sport": string;
  "description"?: string;
  "status"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportTestDefinitionEntity extends DocumentedEntity {
  "name": string;
  "sport": string;
  "organization"?: string;
  "category"?: string;
  "unit"?: string;
  "valueType"?: string;
  "minimumValue"?: number;
  "maximumValue"?: number;
  "higherIsBetter"?: boolean;
  "instructions"?: string;
  "status"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportsClubEntity extends DocumentedEntity {
  "name": string;
  "code"?: string;
  "organization": string;
  "logo"?: string;
  "clubType"?: string;
  "emailAddress"?: string;
  "phoneNumber"?: string;
  "website"?: string;
  "addressStreet"?: string;
  "addressCity"?: string;
  "addressState"?: string;
  "addressCountry"?: string;
  "establishedDate"?: string;
  "status"?: string;
  "notes"?: string;
  "assignedUser"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportsCoachEntity extends DocumentedEntity {
  "name": string;
  "user"?: string;
  "organization"?: string;
  "club"?: string;
  "teams"?: string[];
  "assistantTeams"?: string[];
  "coachType"?: string;
  "specialization"?: string;
  "licenseNumber"?: string;
  "licenseLevel"?: string;
  "experienceYears"?: number;
  "profilePhoto"?: string;
  "status"?: string;
  "notes"?: string;
  "assignedUser"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportsMatchEntity extends DocumentedEntity {
  "name": string;
  "organization": string;
  "team": string;
  "opponentName": string;
  "competitionName"?: string;
  "season"?: string;
  "matchDateTime": string;
  "location"?: string;
  "venueType"?: string;
  "matchStatus"?: string;
  "teamScore"?: number;
  "opponentScore"?: number;
  "result"?: string;
  "matchVideo"?: string;
  "notes"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportsNotificationEntity extends DocumentedEntity {
  "name"?: string;
  "organization"?: string;
  "recipientUser": string;
  "notificationType"?: string;
  "title": string;
  "message": string;
  "relatedEntityType"?: string;
  "relatedEntityId"?: string;
  "readStatus"?: string;
  "deliveryChannel"?: string;
  "deliveryStatus"?: string;
  "sentDate"?: string;
  "readDate"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportsOrganizationEntity extends DocumentedEntity {
  "name": string;
  "code": string;
  "organizationType"?: string;
  "logo"?: string;
  "emailAddress"?: string;
  "phoneNumber"?: string;
  "website"?: string;
  "addressStreet"?: string;
  "addressCity"?: string;
  "addressState"?: string;
  "addressCountry"?: string;
  "status"?: string;
  "subscriptionPlan"?: string;
  "subscriptionStartDate"?: string;
  "subscriptionEndDate"?: string;
  "maximumPlayers"?: number;
  "maximumTeams"?: number;
  "maximumStorageGb"?: number;
  "notes"?: string;
  "assignedUser"?: string;
  "teams"?: string[];
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportsPlayerEntity extends DocumentedEntity {
  "name": string;
  "firstName"?: string;
  "lastName"?: string;
  "user"?: string;
  "emailAddress"?: string;
  "loginPassword"?: string;
  "organization"?: string;
  "club"?: string;
  "sport"?: string;
  "primaryPosition"?: string;
  "secondaryPositions"?: string[];
  "playerNumber"?: string;
  "registrationNumber"?: string;
  "birthDate"?: string;
  "nationality"?: string;
  "gender"?: string;
  "heightCm"?: number;
  "weightKg"?: number;
  "preferredSide"?: string;
  "profilePhoto"?: string;
  "joinDate"?: string;
  "contractStartDate"?: string;
  "contractEndDate"?: string;
  "experienceYears"?: number;
  "medicalStatus"?: string;
  "playerStatus"?: string;
  "publicProfileEnabled"?: boolean;
  "publicProfileSlug"?: string;
  "biography"?: string;
  "strengths"?: string;
  "improvementAreas"?: string;
  "notes"?: string;
  "assignedUser"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportsPlayerTeamEntity extends DocumentedEntity {
  "name"?: string;
  "player": string;
  "team": string;
  "organization": string;
  "startDate": string;
  "endDate"?: string;
  "status"?: string;
  "shirtNumber"?: string;
  "position"?: string;
  "isCaptain"?: boolean;
  "notes"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportsStaffEntity extends DocumentedEntity {
  "name": string;
  "user"?: string;
  "organization"?: string;
  "club"?: string;
  "teams"?: string[];
  "staffType"?: string;
  "licenseNumber"?: string;
  "specialization"?: string;
  "status"?: string;
  "notes"?: string;
  "assignedUser"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportsTeamEntity extends DocumentedEntity {
  "name": string;
  "code"?: string;
  "organization": string;
  "club": string;
  "sport": string;
  "ageGroup"?: string;
  "customAgeGroup"?: string;
  "gender"?: string;
  "season"?: string;
  "level"?: string;
  "status"?: string;
  "trainingLocation"?: string;
  "description"?: string;
  "headCoach"?: string;
  "assistantCoaches"?: string[];
  "sportsUsers"?: string[];
  "assignedUser"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportsUserProfileEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "organization": string;
  "club"?: string;
  "profileType"?: string;
  "accountType"?: string;
  "accountStatus"?: string;
  "status"?: string;
  "lastInvitationDate"?: string;
  "passwordChangeRequired"?: boolean;
  "linkedEntityType"?: string;
  "linkedEntityId"?: string;
  "profilePhoto"?: string;
  "player"?: string;
  "coach"?: string;
  "staff"?: string;
  "notes"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface SportsVideoEntity extends DocumentedEntity {
  "name": string;
  "user": string;
  "organization": string;
  "uploader": string;
  "sport"?: string;
  "team"?: string;
  "match"?: string;
  "trainingSession"?: string;
  "videoType"?: string;
  "videoFile"?: string;
  "externalStorageProvider"?: string;
  "externalStorageKey"?: string;
  "externalUrl"?: string;
  "thumbnail"?: string;
  "durationSeconds"?: number;
  "fileSizeBytes"?: number;
  "processingStatus"?: string;
  "visibility"?: string;
  "description"?: string;
  "recordedDate"?: string;
  "opponentName"?: string;
  "competitionName"?: string;
  "status"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface TrainingAttendanceEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "trainingSession": string;
  "player"?: string;
  "organization": string;
  "attendanceStatus"?: string;
  "checkInTime"?: string;
  "checkOutTime"?: string;
  "participationMinutes"?: number;
  "playerLoad"?: number;
  "coachRating"?: number;
  "notes"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface TrainingSessionEntity extends DocumentedEntity {
  "name": string;
  "organization": string;
  "club"?: string;
  "team": string;
  "coach"?: string;
  "startDateTime": string;
  "endDateTime": string;
  "location"?: string;
  "sessionType"?: string;
  "intensity"?: string;
  "objectives"?: string;
  "description"?: string;
  "status"?: string;
  "notes"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface TrainingTaskEntity extends DocumentedEntity {
  "name": string;
  "organization": string;
  "coach"?: string;
  "team"?: string;
  "assignedPlayers"?: string[];
  "startDate"?: string;
  "dueDate"?: string;
  "taskType"?: string;
  "description"?: string;
  "instructions"?: string;
  "repetitions"?: number;
  "durationMinutes"?: number;
  "difficulty"?: string;
  "referenceVideo"?: string;
  "status"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface UserEntity extends DocumentedEntity {
  "userTypes"?: string;
  "birthDate"?: string;
  "nationality"?: string;
  "organization"?: string;
  "club"?: string;
  "sportsStatus"?: string;
  "profilePhoto"?: string;
  "sport"?: string;
  "primaryPosition"?: string;
  "preferredFoot"?: string;
  "heightCm"?: number;
  "weightKg"?: number;
  "playerNumber"?: string;
  "publicProfileEnabled"?: boolean;
  "coachType"?: string;
  "licenseNumber"?: string;
  "licenseLevel"?: string;
  "experienceYears"?: number;
  "assignedSportsTeams"?: string[];
  "specialization"?: string;
  "scoutInformation"?: string;
  "fitnessInformation"?: string;
  "linkedPlayers"?: string[];
  "gmpGspGdpTrainingStatus"?: string;
}

export interface VideoClipEntity extends DocumentedEntity {
  "name": string;
  "user": string;
  "sourceVideo": string;
  "organization": string;
  "player"?: string;
  "startSecond": number;
  "endSecond": number;
  "clipType"?: string;
  "generatedFile"?: string;
  "processingStatus"?: string;
  "description"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface VideoCommentEntity extends DocumentedEntity {
  "name"?: string;
  "video": string;
  "organization": string;
  "user": string;
  "player"?: string;
  "timeSecond": number;
  "commentType"?: string;
  "comment": string;
  "visibility"?: string;
  "status"?: string;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface VideoTimelineTagEntity extends DocumentedEntity {
  "name"?: string;
  "user": string;
  "video": string;
  "player"?: string;
  "organization": string;
  "timeSecond": number;
  "tagType"?: string;
  "customTag"?: string;
  "title"?: string;
  "description"?: string;
  "rating"?: number;
  "createdBy"?: string;
  "modifiedBy"?: string;
}

export interface EntityTypeMap {
  "EvaluationCriteria": EvaluationCriteriaEntity;
  "MatchPlayerStatistic": MatchPlayerStatisticEntity;
  "ParentPlayerRelation": ParentPlayerRelationEntity;
  "PlayerEvaluation": PlayerEvaluationEntity;
  "PlayerEvaluationItem": PlayerEvaluationItemEntity;
  "PlayerInjury": PlayerInjuryEntity;
  "PlayerMeasurement": PlayerMeasurementEntity;
  "PlayerTask": PlayerTaskEntity;
  "PlayerTestResult": PlayerTestResultEntity;
  "PlayerVideoLink": PlayerVideoLinkEntity;
  "PlayerWellness": PlayerWellnessEntity;
  "RehabilitationPlan": RehabilitationPlanEntity;
  "RehabilitationSession": RehabilitationSessionEntity;
  "Sport": SportEntity;
  "SportPosition": SportPositionEntity;
  "SportTestDefinition": SportTestDefinitionEntity;
  "SportsClub": SportsClubEntity;
  "SportsCoach": SportsCoachEntity;
  "SportsMatch": SportsMatchEntity;
  "SportsNotification": SportsNotificationEntity;
  "SportsOrganization": SportsOrganizationEntity;
  "SportsPlayer": SportsPlayerEntity;
  "SportsPlayerTeam": SportsPlayerTeamEntity;
  "SportsStaff": SportsStaffEntity;
  "SportsTeam": SportsTeamEntity;
  "SportsUserProfile": SportsUserProfileEntity;
  "SportsVideo": SportsVideoEntity;
  "TrainingAttendance": TrainingAttendanceEntity;
  "TrainingSession": TrainingSessionEntity;
  "TrainingTask": TrainingTaskEntity;
  "User": UserEntity;
  "VideoClip": VideoClipEntity;
  "VideoComment": VideoCommentEntity;
  "VideoTimelineTag": VideoTimelineTagEntity;
}
export type DocumentedEntityName = keyof EntityTypeMap;
