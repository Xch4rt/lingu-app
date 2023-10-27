import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import * as admin from 'firebase-admin';
import { initializerFirebase } from "apps/auth/src/firebase.config";

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    private readonly logger = new Logger(FirebaseAuthGuard.name);

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        if (!request.headers.authorization) {
            this.logger.error("User not authorized");
            response.status(401).send({ message: 'Unauthorized' }); 
            return false;
        }
        if (!request.headers.authorization.startsWith('Bearer')) { 
            this.logger.error("User not authorized");
            response.status(401).send({ message: 'Unauthorized' }); 
            return false 
        }


        const token = request.headers.authorization.replace('Bearer', '');

        try {
            const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
            response.locals = {
                ...response.locals,
                uid: decodedToken.uid,
                email: decodedToken.email
            }
            console.log(decodedToken);
            return true;
        } catch (error) {

            response.status(401).send({ message: 'Token de autenticación no válido' });
            return false;
        }
    }
}
