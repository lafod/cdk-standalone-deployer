"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBuildspecs = void 0;
const fs = require("fs");
const path = require("path");
const YAML = require("yaml");
async function createBuildspecs(cdkProjectPath, buildCommand, installCommand, deployCommand, destroyCommand) {
    const deployBuildspec = YAML.stringify({
        version: 0.2,
        env: {
            variables: {
                CFN_RESPONSE_URL: 'CFN_RESPONSE_URL_NOT_SET',
                CFN_STACK_ID: 'CFN_STACK_ID_NOT_SET',
                CFN_REQUEST_ID: 'CFN_REQUEST_ID_NOT_SET',
                CFN_LOGICAL_RESOURCE_ID: 'CFN_LOGICAL_RESOURCE_ID_NOT_SET',
            },
        },
        phases: {
            install: {
                'on-failure': 'ABORT',
                'runtime-versions': {
                    nodejs: 14,
                },
                'commands': [installCommand],
            },
            pre_build: {
                'on-failure': 'ABORT',
                'commands': [
                    'cd $CODEBUILD_SRC_DIR',
                    buildCommand,
                    'export AWS_ACCOUNT_ID=$(echo $CODEBUILD_BUILD_ARN | cut -d: -f5)',
                    'echo "AWS_ACCOUNT_ID: $AWS_ACCOUNT_ID"',
                    'npx cdk bootstrap aws://$AWS_ACCOUNT_ID/$AWS_REGION',
                ],
            },
            build: {
                'on-failure': 'ABORT',
                'commands': [
                    'export AWS_ACCOUNT_ID=$(echo $CODEBUILD_BUILD_ARN | cut -d: -f5)',
                    'echo "AWS_ACCOUNT_ID: $AWS_ACCOUNT_ID"',
                    'echo "VPC ID: $VPC_ID"',
                    'echo "CLOUD9_ENVIRONMENT_ID: $CLOUD9_ENVIRONMENT_ID"',
                    deployCommand,
                ],
            },
        },
    });
    const destroyBuildspec = YAML.stringify({
        version: 0.2,
        env: {
            variables: {
                CFN_RESPONSE_URL: 'CFN_RESPONSE_URL_NOT_SET',
                CFN_STACK_ID: 'CFN_STACK_ID_NOT_SET',
                CFN_REQUEST_ID: 'CFN_REQUEST_ID_NOT_SET',
                CFN_LOGICAL_RESOURCE_ID: 'CFN_LOGICAL_RESOURCE_ID_NOT_SET',
            },
        },
        phases: {
            install: {
                'on-failure': 'ABORT',
                'runtime-versions': {
                    nodejs: 14,
                },
                'commands': [installCommand],
            },
            pre_build: {
                'on-failure': 'ABORT',
                'commands': [
                    'cd $CODEBUILD_SRC_DIR',
                    buildCommand,
                    'export AWS_ACCOUNT_ID=$(echo $CODEBUILD_BUILD_ARN | cut -d: -f5)',
                    'echo "AWS_ACCOUNT_ID: $AWS_ACCOUNT_ID"',
                    'npx cdk bootstrap aws://$AWS_ACCOUNT_ID/$AWS_REGION',
                ],
            },
            build: {
                'on-failure': 'ABORT',
                'commands': [
                    'export AWS_ACCOUNT_ID=$(echo $CODEBUILD_BUILD_ARN | cut -d: -f5)',
                    'echo "AWS_ACCOUNT_ID: $AWS_ACCOUNT_ID"',
                    'echo "VPC ID: $VPC_ID"',
                    'echo "CLOUD9_ENVIRONMENT_ID: $CLOUD9_ENVIRONMENT_ID"',
                    destroyCommand,
                ],
            },
        },
    });
    await fs.writeFileSync(path.join(cdkProjectPath, 'buildspec-deploy.yml'), deployBuildspec);
    await fs.writeFileSync(path.join(cdkProjectPath, 'buildspec-destroy.yml'), destroyBuildspec);
}
exports.createBuildspecs = createBuildspecs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQnVpbGRzcGVjcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY3JlYXRlQnVpbGRzcGVjcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUV0QixLQUFLLFVBQVUsZ0JBQWdCLENBQ3BDLGNBQXNCLEVBQ3RCLFlBQW9CLEVBQ3BCLGNBQXNCLEVBQ3RCLGFBQXFCLEVBQ3JCLGNBQXNCO0lBRXRCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckMsT0FBTyxFQUFFLEdBQUc7UUFDWixHQUFHLEVBQUU7WUFDSCxTQUFTLEVBQUU7Z0JBQ1QsZ0JBQWdCLEVBQUUsMEJBQTBCO2dCQUM1QyxZQUFZLEVBQUUsc0JBQXNCO2dCQUNwQyxjQUFjLEVBQUUsd0JBQXdCO2dCQUN4Qyx1QkFBdUIsRUFBRSxpQ0FBaUM7YUFDM0Q7U0FDRjtRQUNELE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRTtnQkFDUCxZQUFZLEVBQUUsT0FBTztnQkFDckIsa0JBQWtCLEVBQUU7b0JBQ2xCLE1BQU0sRUFBRSxFQUFFO2lCQUNYO2dCQUNELFVBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQzthQUM3QjtZQUNELFNBQVMsRUFBRTtnQkFDVCxZQUFZLEVBQUUsT0FBTztnQkFDckIsVUFBVSxFQUFFO29CQUNWLHVCQUF1QjtvQkFDdkIsWUFBWTtvQkFDWixrRUFBa0U7b0JBQ2xFLHdDQUF3QztvQkFDeEMscURBQXFEO2lCQUN0RDthQUNGO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLFlBQVksRUFBRSxPQUFPO2dCQUNyQixVQUFVLEVBQUU7b0JBQ1Ysa0VBQWtFO29CQUNsRSx3Q0FBd0M7b0JBQ3hDLHdCQUF3QjtvQkFDeEIsc0RBQXNEO29CQUN0RCxhQUFhO2lCQUNkO2FBQ0Y7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUVILE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN0QyxPQUFPLEVBQUUsR0FBRztRQUNaLEdBQUcsRUFBRTtZQUNILFNBQVMsRUFBRTtnQkFDVCxnQkFBZ0IsRUFBRSwwQkFBMEI7Z0JBQzVDLFlBQVksRUFBRSxzQkFBc0I7Z0JBQ3BDLGNBQWMsRUFBRSx3QkFBd0I7Z0JBQ3hDLHVCQUF1QixFQUFFLGlDQUFpQzthQUMzRDtTQUNGO1FBQ0QsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFO2dCQUNQLFlBQVksRUFBRSxPQUFPO2dCQUNyQixrQkFBa0IsRUFBRTtvQkFDbEIsTUFBTSxFQUFFLEVBQUU7aUJBQ1g7Z0JBQ0QsVUFBVSxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQzdCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFlBQVksRUFBRSxPQUFPO2dCQUNyQixVQUFVLEVBQUU7b0JBQ1YsdUJBQXVCO29CQUN2QixZQUFZO29CQUNaLGtFQUFrRTtvQkFDbEUsd0NBQXdDO29CQUN4QyxxREFBcUQ7aUJBQ3REO2FBQ0Y7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsWUFBWSxFQUFFLE9BQU87Z0JBQ3JCLFVBQVUsRUFBRTtvQkFDVixrRUFBa0U7b0JBQ2xFLHdDQUF3QztvQkFDeEMsd0JBQXdCO29CQUN4QixzREFBc0Q7b0JBQ3RELGNBQWM7aUJBQ2Y7YUFDRjtTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLHNCQUFzQixDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDM0YsTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLHVCQUF1QixDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUMvRixDQUFDO0FBMUZELDRDQTBGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBZQU1MIGZyb20gJ3lhbWwnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQnVpbGRzcGVjcyhcbiAgY2RrUHJvamVjdFBhdGg6IHN0cmluZyxcbiAgYnVpbGRDb21tYW5kOiBzdHJpbmcsXG4gIGluc3RhbGxDb21tYW5kOiBzdHJpbmcsXG4gIGRlcGxveUNvbW1hbmQ6IHN0cmluZyxcbiAgZGVzdHJveUNvbW1hbmQ6IHN0cmluZyxcbikge1xuICBjb25zdCBkZXBsb3lCdWlsZHNwZWMgPSBZQU1MLnN0cmluZ2lmeSh7XG4gICAgdmVyc2lvbjogMC4yLFxuICAgIGVudjoge1xuICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgIENGTl9SRVNQT05TRV9VUkw6ICdDRk5fUkVTUE9OU0VfVVJMX05PVF9TRVQnLFxuICAgICAgICBDRk5fU1RBQ0tfSUQ6ICdDRk5fU1RBQ0tfSURfTk9UX1NFVCcsXG4gICAgICAgIENGTl9SRVFVRVNUX0lEOiAnQ0ZOX1JFUVVFU1RfSURfTk9UX1NFVCcsXG4gICAgICAgIENGTl9MT0dJQ0FMX1JFU09VUkNFX0lEOiAnQ0ZOX0xPR0lDQUxfUkVTT1VSQ0VfSURfTk9UX1NFVCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGhhc2VzOiB7XG4gICAgICBpbnN0YWxsOiB7XG4gICAgICAgICdvbi1mYWlsdXJlJzogJ0FCT1JUJyxcbiAgICAgICAgJ3J1bnRpbWUtdmVyc2lvbnMnOiB7XG4gICAgICAgICAgbm9kZWpzOiAxNCxcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbW1hbmRzJzogW2luc3RhbGxDb21tYW5kXSxcbiAgICAgIH0sXG4gICAgICBwcmVfYnVpbGQ6IHtcbiAgICAgICAgJ29uLWZhaWx1cmUnOiAnQUJPUlQnLFxuICAgICAgICAnY29tbWFuZHMnOiBbXG4gICAgICAgICAgJ2NkICRDT0RFQlVJTERfU1JDX0RJUicsXG4gICAgICAgICAgYnVpbGRDb21tYW5kLFxuICAgICAgICAgICdleHBvcnQgQVdTX0FDQ09VTlRfSUQ9JChlY2hvICRDT0RFQlVJTERfQlVJTERfQVJOIHwgY3V0IC1kOiAtZjUpJyxcbiAgICAgICAgICAnZWNobyBcIkFXU19BQ0NPVU5UX0lEOiAkQVdTX0FDQ09VTlRfSURcIicsXG4gICAgICAgICAgJ25weCBjZGsgYm9vdHN0cmFwIGF3czovLyRBV1NfQUNDT1VOVF9JRC8kQVdTX1JFR0lPTicsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgYnVpbGQ6IHtcbiAgICAgICAgJ29uLWZhaWx1cmUnOiAnQUJPUlQnLFxuICAgICAgICAnY29tbWFuZHMnOiBbXG4gICAgICAgICAgJ2V4cG9ydCBBV1NfQUNDT1VOVF9JRD0kKGVjaG8gJENPREVCVUlMRF9CVUlMRF9BUk4gfCBjdXQgLWQ6IC1mNSknLFxuICAgICAgICAgICdlY2hvIFwiQVdTX0FDQ09VTlRfSUQ6ICRBV1NfQUNDT1VOVF9JRFwiJyxcbiAgICAgICAgICAnZWNobyBcIlZQQyBJRDogJFZQQ19JRFwiJyxcbiAgICAgICAgICAnZWNobyBcIkNMT1VEOV9FTlZJUk9OTUVOVF9JRDogJENMT1VEOV9FTlZJUk9OTUVOVF9JRFwiJyxcbiAgICAgICAgICBkZXBsb3lDb21tYW5kLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBkZXN0cm95QnVpbGRzcGVjID0gWUFNTC5zdHJpbmdpZnkoe1xuICAgIHZlcnNpb246IDAuMixcbiAgICBlbnY6IHtcbiAgICAgIHZhcmlhYmxlczoge1xuICAgICAgICBDRk5fUkVTUE9OU0VfVVJMOiAnQ0ZOX1JFU1BPTlNFX1VSTF9OT1RfU0VUJyxcbiAgICAgICAgQ0ZOX1NUQUNLX0lEOiAnQ0ZOX1NUQUNLX0lEX05PVF9TRVQnLFxuICAgICAgICBDRk5fUkVRVUVTVF9JRDogJ0NGTl9SRVFVRVNUX0lEX05PVF9TRVQnLFxuICAgICAgICBDRk5fTE9HSUNBTF9SRVNPVVJDRV9JRDogJ0NGTl9MT0dJQ0FMX1JFU09VUkNFX0lEX05PVF9TRVQnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBoYXNlczoge1xuICAgICAgaW5zdGFsbDoge1xuICAgICAgICAnb24tZmFpbHVyZSc6ICdBQk9SVCcsXG4gICAgICAgICdydW50aW1lLXZlcnNpb25zJzoge1xuICAgICAgICAgIG5vZGVqczogMTQsXG4gICAgICAgIH0sXG4gICAgICAgICdjb21tYW5kcyc6IFtpbnN0YWxsQ29tbWFuZF0sXG4gICAgICB9LFxuICAgICAgcHJlX2J1aWxkOiB7XG4gICAgICAgICdvbi1mYWlsdXJlJzogJ0FCT1JUJyxcbiAgICAgICAgJ2NvbW1hbmRzJzogW1xuICAgICAgICAgICdjZCAkQ09ERUJVSUxEX1NSQ19ESVInLFxuICAgICAgICAgIGJ1aWxkQ29tbWFuZCxcbiAgICAgICAgICAnZXhwb3J0IEFXU19BQ0NPVU5UX0lEPSQoZWNobyAkQ09ERUJVSUxEX0JVSUxEX0FSTiB8IGN1dCAtZDogLWY1KScsXG4gICAgICAgICAgJ2VjaG8gXCJBV1NfQUNDT1VOVF9JRDogJEFXU19BQ0NPVU5UX0lEXCInLFxuICAgICAgICAgICducHggY2RrIGJvb3RzdHJhcCBhd3M6Ly8kQVdTX0FDQ09VTlRfSUQvJEFXU19SRUdJT04nLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIGJ1aWxkOiB7XG4gICAgICAgICdvbi1mYWlsdXJlJzogJ0FCT1JUJyxcbiAgICAgICAgJ2NvbW1hbmRzJzogW1xuICAgICAgICAgICdleHBvcnQgQVdTX0FDQ09VTlRfSUQ9JChlY2hvICRDT0RFQlVJTERfQlVJTERfQVJOIHwgY3V0IC1kOiAtZjUpJyxcbiAgICAgICAgICAnZWNobyBcIkFXU19BQ0NPVU5UX0lEOiAkQVdTX0FDQ09VTlRfSURcIicsXG4gICAgICAgICAgJ2VjaG8gXCJWUEMgSUQ6ICRWUENfSURcIicsXG4gICAgICAgICAgJ2VjaG8gXCJDTE9VRDlfRU5WSVJPTk1FTlRfSUQ6ICRDTE9VRDlfRU5WSVJPTk1FTlRfSURcIicsXG4gICAgICAgICAgZGVzdHJveUNvbW1hbmQsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuICBhd2FpdCBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihjZGtQcm9qZWN0UGF0aCwgJ2J1aWxkc3BlYy1kZXBsb3kueW1sJyksIGRlcGxveUJ1aWxkc3BlYyk7XG4gIGF3YWl0IGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKGNka1Byb2plY3RQYXRoLCAnYnVpbGRzcGVjLWRlc3Ryb3kueW1sJyksIGRlc3Ryb3lCdWlsZHNwZWMpO1xufVxuIl19