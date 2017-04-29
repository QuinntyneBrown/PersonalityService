using System;
using System.Collections.Generic;
using PersonalityService.Data.Helpers;
using System.ComponentModel.DataAnnotations.Schema;

using static PersonalityService.Constants;
using System.ComponentModel.DataAnnotations;

namespace PersonalityService.Data.Model
{
    [SoftDelete("IsDeleted")]
    public class Personality: ILoggable
    {
        public int Id { get; set; }
        
		[ForeignKey("Tenant")]
        public int? TenantId { get; set; }
        
		[Index("PersonalityNameIndex", IsUnique = false)]
        [Column(TypeName = "VARCHAR")]
        [StringLength(MaxStringLength)]
        public string Name { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string ImageUrl { get; set; }

        public string Abstract { get; set; }

        public string Bio { get; set; }

        public string Twitter { get; set; }

        public string LinkedIn { get; set; }

        public string Github { get; set; }

        public DateTime CreatedOn { get; set; }
        
		public DateTime LastModifiedOn { get; set; }
        
		public string CreatedBy { get; set; }
        
		public string LastModifiedBy { get; set; }
        
		public bool IsDeleted { get; set; }

        public virtual Tenant Tenant { get; set; }
    }
}
