import { Category } from './category';
import { Tag } from './tag';

export interface Image {
    id: string,
    file: File;
    published: Boolean;
    title?: String;    
    category?: Category;
    tags?: Tag[];
    publishedDate?: Date;
    url: string;
    user?: string;
}