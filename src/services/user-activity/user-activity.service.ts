import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comment-dto';
import { UserActivityRepository } from 'src/repositories/user-activity-repository/user-acitivity.repository';
import { UserActivity } from 'src/domain/schemas/user-activity.schema';
import { readFileSync } from 'fs';
import { LikeOrDislikeViewModel } from 'src/domain/like-or-deslike.viewmodel';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class UserActivityService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userActivityRepository: UserActivityRepository,
        private readonly websocketGateway: WebsocketGateway
    ) { }


    async getRecentUploads(index: string) {
        const indexAsNumber = parseInt(index, 10);
        if (isNaN(indexAsNumber)) {
            throw new BadRequestException('Invalid index');
        }

        const recentUploads = await this.userActivityRepository.getPaged(indexAsNumber);

        return this.convertImagesBase64(recentUploads);
    }

    async uploadImage(
        userId: string,
        filename: string,
        description: string
    ) {
        const user = await this.userRepository.getById(userId);

        if (!user) {
            throw new BadRequestException('This user does not exist');
        }

        const uploadImageObj = new UserActivityDto(userId, filename, user.userName);
        if (description) {
            uploadImageObj.comments.push(new UserActivityCommentDto(
                userId,
                user.userName,
                description
            ));
        }

        const createUserAcitivty = await this.userActivityRepository.create(uploadImageObj);

        return await this.convertImageToBase64ForOneFile(createUserAcitivty);

    }
    convertImagesBase64(userActivities: UserActivity[]) {
        return Promise.all(
            userActivities.map(userActivity => {
                return {
                    ...userActivities,
                    imgEncoded: readFileSync('../images/' + userActivity.fileName, 'base64'),
                }
            })
        )
    }

    async likeOrDeslikeUserActivity(likeOrDeslikeUserActivity: LikeOrDislikeViewModel) {
        const userActivity = await this.userActivityRepository.getById(likeOrDeslikeUserActivity.userActivityId);

        if (!userActivity) {
            throw new BadRequestException('An User Activity with the given id does not exist');
        }

        const user = await this.userRepository.getById(likeOrDeslikeUserActivity.userId);

        if (!user) {
            throw new BadRequestException('An user with the given id deos not exist');
        }

        if (userActivity.likes.includes(user._id.toString())) {
            userActivity.likes = userActivity.likes.filter(x => x !== user._id.toString());
        } else {
            userActivity.likes.push(user._id.toString());
        }

        const updateUserActivity = await this.userActivityRepository.update(userActivity);
        
        this.websocketGateway.notifyOnLike(userActivity._id, userActivity.userId);

        return updateUserActivity;
    }

    convertImageToBase64ForOneFile(userActivity: UserActivity) {
        return {
            ...userActivity,
            imgEncoded: readFileSync('../images/' + userActivity.fileName, 'base64'),
        };
    }

}
