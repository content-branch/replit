# Deployment Guide for Web Developers - GitHub Actions CI/CD

This guide explains how to deploy your web application using GitHub Actions CI/CD. The provided GitHub Actions workflow will automatically build, tag, and deploy your application to Amazon ECS based on the chosen environment. Please follow the steps below:

This apps should be reachable : https://preprod.westfieldrise.com/

## Deployment Steps

1. Navigate to your GitHub repository and click on the "Actions" tab.
2. Select the "Deploy back" workflow from the available workflows.
3. Click on the "Run workflow" button to trigger the deployment process.

## Configuration

1. When prompted, choose the deployment environment from the available options:
   - `INFRA_ENV`: Choose either "noprod" or "prod" to specify the infrastructure environment.
   - `APP_ENV`: Choose either "dev" or "prod" to specify the application environment.

2. The deployment workflow will now be executed, and it consists of the following steps:

### Step 1: Checkout the Code

The workflow will first fetch the latest code from your repository.

### Step 2: Configure AWS Credentials

AWS credentials are required to authenticate with the AWS services. These credentials are already set up in the repository secrets, and this step will configure them.

### Step 3: Login to Amazon ECR

The workflow will log in to the Amazon Elastic Container Registry (ECR) to prepare for pushing the Docker image.

### Step 4: Build and Push Docker Image

The application's Docker image will be built, tagged with a unique identifier (GitHub SHA), and pushed to the Amazon ECR.

### Step 5: Update ECS Task Definition

The new Docker image's ID will be updated in the Amazon ECS task definition to reflect the latest changes.

### Step 6: Deploy ECS Task Definition

Finally, the workflow will deploy the updated task definition to the specified Amazon ECS service in the selected cluster. It will wait for the service to stabilize before completing the deployment.

## Monitor Deployment

Once the deployment workflow is completed, you can monitor the deployment progress by checking the ECS service in the AWS Management Console. The service should reflect the updated task definition with the latest changes.

## Congratulations!

Your web application has been successfully deployed using GitHub Actions CI/CD. It will now be available in the specified Amazon ECS environment for users to access.

Please note that this guide assumes the AWS authentication is already configured in the repository. If you encounter any issues during the deployment process, review your AWS authentication setup and ensure that the required permissions are correctly set up in your AWS account.
