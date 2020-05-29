import { Category } from './category';
import { Tag } from './tag';

export interface Image {
    title: String;
    file: File;
    category?: Category;
    tags?: Tag[];
}