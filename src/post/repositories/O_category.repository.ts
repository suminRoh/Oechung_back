import { EntityRepository, Repository } from "typeorm";
import { O_category } from "../entities/O_category.entity";

@EntityRepository(O_category)
export class O_categoryRepository extends Repository<O_category>{
    async getOrCreate(name: string): Promise<O_category> {
        const categoryName = name.trim().toLowerCase();
        const categorySlug = categoryName.replace(/ /g, '-');
        let category = await this.findOne({ slug: categorySlug });
        if (!category) {
          category = await this.save(
            this.create({ slug: categorySlug, name: categoryName }),
          );
        }
        return category;
      }
} 