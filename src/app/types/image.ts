import { Category } from './category';
import { Tag } from './tag';

export interface Image {
    file: File;
    published: Boolean;
    title?: String;    
    category?: Category;
    tags?: Tag[];
    publishedDate?: Date;
}