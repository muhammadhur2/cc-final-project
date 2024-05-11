pipeline {
    agent any 
    stages {
        stage('Checkout SCM') {
            steps {  
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/muhammadhur2/cc-final-project.git'
            }
        }
        stage('Build and Deploy with Docker Compose') {
            steps {
                script {
                    // SSH command to execute Docker Compose on a remote machine
                    sshPublisher(publishers: [
                        sshPublisherDesc(
                            configName: "final-project",
                            transfers: [
                                sshTransfer(
                                    sourceFiles: '**/*',
                                    removePrefix: '',
                                    remoteDirectory: '/home/user/project/', // Adjust this to the desired path on the remote server
                                    execCommand: """
                                        cd /home/user/project/  // Adjust this path to match the remoteDirectory above
                                        docker compose down
                                        docker compose up -d --build
                                    """
                                )
                            ]
                        )
                    ])
                }
            }
        }
    }
}
