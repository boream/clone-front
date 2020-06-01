import { Category } from './category';
import { Tag } from './tag';
import { User } from './user';

export interface Image {
    id?: string,
    file: File;
    published: Boolean;
    title?: String;
    category?: Category;
    tags?: Tag[];
    publishedDate?: Date;
    url?: string;
    user?: User;
}
