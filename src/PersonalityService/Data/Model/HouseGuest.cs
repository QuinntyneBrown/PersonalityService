using System;
using System.Collections.Generic;
using PersonalityService.Data.Helpers;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalityService.Data.Model
{
    [SoftDelete("IsDeleted")]
    public class HouseGuest: Personality
    {
        public int Age { get; set; }

        public string HomeTown { get; set; }

        public string Occupation { get; set; }

        public int HeadOfHouseholdWins { get; set; }

        public int PowerOfVetoWins { get; set; }

        public ICollection<PersonalityResponse> PersonalityResponses { get; set; } = new HashSet<PersonalityResponse>();
    }
}
